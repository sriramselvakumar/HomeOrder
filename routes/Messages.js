const express = require("express");
const router = express.Router();
const { Messages } = require("../models/MessagesModel");

router.get("/messages/:id", async (req, res) => {
  try {
    const messages = await Messages.findOne({ chatID: req.params.id });
    if (messages) {
      let messageObjects = [];
      for (let index = 0; index < messages.messages.length; index++) {
        messageObjects.push({
          userName: messages.authors[index],
          text: messages.messages[index],
        });
      }
      res.send(messageObjects);
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/registerMessage", async (req, res) => {
  try {
    let messages = await Messages.findOne({ chatID: req.body.chatID });

    if (!messages) {
      messages = new Messages({
        messages: [],
        authors: [],
        chatID: req.body.chatID,
      });
      console.log(messages);
    }

    messages.authors.push(req.body.userName);
    messages.messages.push(req.body.text);
    await messages.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
