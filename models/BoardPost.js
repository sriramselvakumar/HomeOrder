const mongoose = require("mongoose");

const BoardPostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  fileName: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  comments: [{ type: Object }],
  likes: [{ type: String }],
});

const BoardPost = mongoose.model("BoardPost", BoardPostSchema);
module.exports = BoardPost;
