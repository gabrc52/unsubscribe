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

router.get("/user/:userId", ensureLoggedIn, (req, res) => {
  User.findOne({ userId: req.params.userId })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: `${e}` });
    });
});

router.get("/user/me/posts", ensureLoggedIn, async (req, res) => {
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

router.post("/foodevents/new", ensureLoggedIn, async (req, res) => {
  try {
    const creator_userId = req.user!.userId;

    // const form = formidable({});
    const form = formidable({ multiples: true });

    // Parse the incoming form data
    // const [fields, files] = await form.parse(req);
    form.parse(req, async (err, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        res.status(StatusCodes.BAD_REQUEST).send({ error: "Error parsing form data" });
        return;
      }

      // For Debugging
      console.log("Fields:", fields);
      console.log("Files:", files);

      // Check that food_event is set before uploading images and stuff
      if (!("food_event" in fields)) {
        console.error("Fields does not have a food_event");
        res.status(StatusCodes.BAD_REQUEST).send({ error: "food_event not passed!" });
        return;
      }

      // TODO: potentially validate other fields,
      // see fdd4ddd9e5e5611a622a97b48ad5f970ddc95d53 for a template/example

      const photos = files.photo ?? [];

      // Process each uploaded photo
      // TODO: check that they are images with a mime type library
      const photoUrls = await Promise.all(
        photos.map(async (photoFile: formidable.File) => {
          // Get the file details from Formidable's file object
          const photoFilePath = photoFile.filepath;
          const photoFileName = photoFile.newFilename;
          const photoFileType = photoFile.mimetype || "application/octet-stream"; // Provide a default value

          // Read the file content as a Buffer
          const fileContent = await fs.promises.readFile(photoFilePath);

          // Use the existing uploadFile function for file upload
          const uploadedFilePath = await uploadFile(fileContent, photoFileName, photoFileType);

          return uploadedFilePath;
        })
      );

      // has everything minus the images
      const submittedFoodEvent = JSON.parse(fields.food_event!.at(0)!);

      const newFoodEvent = new FoodEvent({
        creator_userId,
        ...submittedFoodEvent,
        // so add the images
        photos: photoUrls,
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

router.get("/foodevents/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ parent: req.params.postId });
    const populatedComments = await Promise.all(
      comments.map(async (comment) => {
        // - should i make parent function to getCreatorName or is this fine enough for now
        // - i'm not sure what you're asking but it's probably fine?
        const creator = await getCreatorName(comment.creator_userId, undefined);
        return { ...comment.toObject(), creator };
      })
    );
    res.send(populatedComments);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: `${error}` });
  }
});

router.post("/foodevents/:postId/comments/new", ensureLoggedIn, (req, res) => {
  console.log("Attempt to add new comment");
  console.log("post id", req.params.postId);
  const newComment = new Comment({
    creator_userId: req.user!.userId,
    parent: req.params.postId,
    content: req.body.content,
  });
  console.log(newComment);
  newComment
    .save()
    .then((comment) => res.send(comment))
    .catch((error) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      console.error(error);
      res.send({ error: `${error}` });
    });
});

router.delete("/foodevents/:postId", ensureLoggedIn, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user!.userId;

    const post = await FoodEvent.findById(postId);
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Post not found" });
    }
    if (post.creator_userId !== userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ error: "You are not authorized to delete this post" });
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
