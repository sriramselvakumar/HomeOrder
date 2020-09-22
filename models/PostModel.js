const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  postName: { type: String, required: true },
  fileName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: mongoose.Number, required: true },
  stock: { type: mongoose.Number },
  purchased: { type: mongoose.Number, required: true },
  author: { type: String, required: true },
});

const Post = mongoose.model("Post", PostSchema);

module.exports.Post = Post;
module.exports.PostSchema = PostSchema;
