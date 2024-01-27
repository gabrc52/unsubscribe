import express from "express";
import { StatusCodes } from "http-status-codes";
import "process";
import { loginGoogle, loginTouchstone, logout, ensureLoggedIn, redirectOidc } from "./auth";
import { handleEmail } from "./email";
import socketManager from "./server-socket";
const ragManager = require("./rag");

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
router.get("/foodevents", ensureLoggedIn, (req, res) => {
  FoodEvent.find({}).then((foodevents) => res.send(foodevents));
});

router.post("/foodevent", ensureLoggedIn, (req, res) => {
  const newFoodEvent = new FoodEvent({
    creator_userId: req.body.creator_userId,
    title: req.body.title,
    food_type: req.body.food_type,
    photos: req.body.photos,
    content: req.body.content,
  });

  newFoodEvent.save().then((foodevent) => res.send(foodevent));
});

router.post("/comment", ensureLoggedIn, (req, res) => {
  const newComment = new Comment({
    creator_userId: req.body.creator_userId,
    content: req.body.content,
  });
  newComment.save().then((comment) => res.send(comment));
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/query", (req, res) => {
  const makeQuery = async () => {
    try {
      const queryresponse = await ragManager.retrievalAugmentedGeneration(req.body.query);
      res.send({ queryresponse });
    } catch (error) {
      console.log("error:", error);
      res.status(500);
      res.send({});
    }
  };
  makeQuery();
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
