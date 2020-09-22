const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  messages: { type: [String], required: true },
  authors: { type: [String], required: true },
  chatID: { type: String, required: true },
});

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports.Messages = Messages;
module.exports.MessagesSchema = MessagesSchema;
