import express from "express";
import { StatusCodes } from "http-status-codes";
import "process";
// an actually async multipart/form-data
import formidable, { errors as formidableErrors } from "formidable";
import { loginGoogle, loginTouchstone, logout, ensureLoggedIn, redirectOidc } from "./auth";
import { handleEmail } from "./email";
import socketManager from "./server-socket";
import { getCreatorName } from "./util";
import { uploadFile } from "./file";
// import ragManager from "./rag";
import * as fs from "fs"; // Import the callback-based fs module

// import models so we can interact with the database
import Comment from "./models/Comment";
import FoodEvent from "./models/FoodEvent";
import User from "./models/User";

const router = express.Router();

router.post("/receive_email", (req, res) => {
  if (!req.body["token"]) {
    console.warn("Error: /receive_email was called without a shared secret.");
    return res.status(StatusCodes.UNAUTHORIZED).send({ error: "Missing shared secret (token)." });
  }
  if (req.body["token"] !== process.env.EMAIL_SHARED_SECRET) {
    console.warn("Error: /receive_email was called with an incorrect shared secret.");
    return res.status(StatusCodes.FORBIDDEN).send({ error: "Wrong token passed." });
  }
  if (!req.body["email"]) {
    console.warn("Error: /receive_email was called with an incorrect shared secret.");
    return res.status(StatusCodes.BAD_REQUEST).send({ error: "No email given." });
  }
  handleEmail(req.body["email"])
    .then(() => res.status(StatusCodes.CREATED).send({}))
    .catch((e) => res.status(500).send({ error: `${e}` }));
});

router.post("/login/google", loginGoogle);
router.post("/logout", logout);

router.get("/login/touchstone/redirect", redirectOidc);
router.get("/login/touchstone", loginTouchstone);

router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/user/posts", ensureLoggedIn, async (req, res) => {
  try {
    const userId = req.user!.userId;
    console.log("logged in user id is", userId);
    const userPosts = await FoodEvent.find({ creator_userId: userId });
    res.send(userPosts);
  } catch (error) {
    console.error("Error retrieving user posts:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.send({ error: `${error}` });
  }
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/foodevents", ensureLoggedIn, async (req, res) => {
  // TODO: ideally do this in one mongo query. since we are on a deadline, we can do it later
  // it might cause performance issues down the line, but we could use pagination anyway/instead/in addition
  try {
    const foodevents = await FoodEvent.find({});
    const populatedEvents = await Promise.all(
      foodevents.map(async (event) => {
        const creator = await getCreatorName(event.creator_userId, event.emailer_name);
        return { ...event.toObject(), creator };
      })
    );
    res.send(populatedEvents);
  } catch (error) {
    console.error("Error retrieving food events:", error);
    res.send();
  }
});

router.post("/foodevent", ensureLoggedIn, async (req, res) => {
  try {
    const creator_userId = req.user!.userId;

    // const form = formidable({});
    const form = formidable({ multiples: true });

    // Parse the incoming form data
    // const [fields, files] = await form.parse(req);
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        res.status(StatusCodes.BAD_REQUEST).send({ error: "Error parsing form data" });
        return;
      }

      // // Ensure 'photo' field is present in the form data
      // const photos = Array.isArray(files.photo) ? files.photo : [files.photo];

      // Explicitly type 'photos' as formidable.File[]
      // const photos: formidable.File[] = Array.isArray(files.photo) ? files.photo : [files.photo];
      const photos: formidable.File[] = (Array.isArray(files.photo) ? files.photo : [files.photo]).filter(
        (file): file is formidable.File => file !== undefined
      );

      // Access the fields and files
      console.log("Fields:", fields);
      console.log("Files:", files);

      // Check if 'photo' field is present in the form data
      // if (!files.photo) {
      //   res.status(StatusCodes.BAD_REQUEST).send({ error: "No photo uploaded" });
      //   return;
      // }
      if (!photos || photos.length === 0) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: "No photo uploaded" });
        return;
      }

      // // Get the file details
      // const photoFile = files.photo;
      // const photoFilePath = photoFile.path;
      // const photoFileName = photoFile.name;
      // const photoFileType = photoFile.type;
      // const uploadedFilePath = await uploadFile(photoFilePath, photoFileName, photoFileType);

      // // TODO: Validate other fields as needed
      // const newFoodEvent = new FoodEvent({
      //   creator_userId,
      //   ...fields,
      //   // Add the file path or URL to the 'photo' field
      //   photo: uploadedFilePath,
      // });

      // Process each uploaded photo
      const processedPhotos = await Promise.all(
        photos.map(async (photoFile: formidable.File) => {
          // Get the file details from Formidable's file object
          const photoFilePath = photoFile.filepath;
          const photoFileName = photoFile.newFilename;
          const photoFileType = photoFile.mimetype || "application/octet-stream"; // Provide a default value

          // Read the file content as a Buffer
          // const fileContent = await fs.readFile(photoFilePath);
          const fileContent = await new Promise<Buffer>((resolve, reject) => {
            fs.readFile(photoFilePath, (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          });

          // Use the existing uploadFile function for file upload
          const uploadedFilePath = await uploadFile(fileContent, photoFileName, photoFileType);

          return uploadedFilePath;
        })
      );

      // TODO: Validate other fields as needed
      function validateFields(fields: any) {
        // Example validation: Check if 'location' is provided
        if (!fields.location) {
          throw new Error("Location is required.");
        }

        // TODO: Add more validation checks for other fields...

        // If all validations pass, return true or perform additional processing
        return true;
      }

      // // Assuming 'fields' is the object containing form fields
      // if (validateFields(fields)) {
      //   // Validation successful, proceed to create FoodEvent
      //   const newFoodEvent = new FoodEvent({
      //     creator_userId,
      //     ...fields,
      //     photos: processedPhotos,
      //   });
        
      //   // Perform any additional processing or save the newFoodEvent to the database
      // } else {
      //   // Handle validation errors or prevent the creation of the FoodEvent
      //   console.error("Validation failed. FoodEvent not created.");
      // }
      
      const newFoodEvent = new FoodEvent({
        creator_userId,
        ...fields, // ...req.body,
        // Add the array of file paths or URLs to the 'photos' field
        photos: processedPhotos,
      });

      // Save the new food event
      const savedEvent = await newFoodEvent.save();

      // Send the response
      res.send(savedEvent);
    });
  } catch (error) {
    console.error("Error creating food event:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.send({ error: `${error}` });
  }
});

router.get("/comment", async (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.get("/comments", async (req, res) => {
  // Comment.find({ parent: req.query.parent }).then((comments) => {
  //   res.send(comments);
  // });
  try {
    const comments = await Comment.find({ parent: req.query.parent });
    const populatedComments = await Promise.all(
      comments.map(async (comment) => {
        const creator = await getCreatorName(comment.creator_userId, undefined); // should i make parent function to getCreatorName or is this fine enough for now
        return { ...comment.toObject(), creator };
      })
    );
    res.send(populatedComments);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/comment", ensureLoggedIn, (req, res) => {
  const newComment = new Comment({
    creator_userId: req.body.creator_userId,
    parent: req.body.parent,
    content: req.body.content,
  });
  newComment.save().then((comment) => res.send(comment));
});

router.delete("/delete_post/:postId", ensureLoggedIn, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user!.userId;

    const post = await FoodEvent.findById(postId);
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Post not found" });
    }
    if (post.creator_userId !== userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: "You are not authorized to delete this post" });
    }

    await FoodEvent.findByIdAndDelete(postId);
    res.status(StatusCodes.OK).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: `${error}` });
  }
});



// MUST FIX rag.ts TO USE THIS

// router.post("/query", (req, res) => {
//   const makeQuery = async () => {
//     try {
//       const queryresponse = await ragManager.retrievalAugmentedGeneration(req.body.query);
//       res.send({ queryresponse });
//     } catch (error) {
//       console.log("error:", error);
//       res.status(500);
//       res.send({});
//     }
//   };
//   makeQuery();
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
