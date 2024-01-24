import express from "express";
import auth from "./auth"; // import authentication library
import socketManager from "./server-socket";

// import models so we can interact with the database
const User = require("./models/User");
const FoodEvent = require("./models/FoodEvent");
const Comment = require("./models/Comment");

const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
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
router.get("/foodevents", (req, res) => {
  FoodEvent.find({}).then((foodevents) => res.send(foodevents));
});

router.post("/foodevent", auth.ensureLoggedIn, (req, res) => {
  const newFoodEvent = new FoodEvent({
    creator_googleid: req.body.creator_googleid,
    food_type: req.body.food_type,
    photo: req.body.photo,
    content: req.body.content,
  });

  newFoodEvent.save().then((foodevent) => res.send(foodevent));
});

router.post("/comment", auth.ensureLoggedIn, (req, res) => {
  const newComment = new Comment({
    creator_googleid: req.body.creator_googleid,
    content: req.body.content,
  });
  newComment.save().then((comment) => res.send(comment));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
