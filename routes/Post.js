const express = require("express");
const router = express.Router();
const { Post } = require("../models/PostModel");
const { Admin } = require("../models/AdminModel");
const { authAdmin } = require("../middleware/Authentication");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

//create new post
router.post(
  "/createPost",
  authAdmin,
  upload.single("picture"),
  async (req, res) => {
    let post = new Post({
      orgName: req.body.orgName,
      postName: req.body.postName,
      fileName: req.file.filename,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      author: req.body.author,
      purchased: 0,
    });
    await post.save();
  }
);

//Get all posts
router.get("/allposts", async (req, res) => {
  try {
    let posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/getAdminPosts", authAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    let posts = await Post.find({author:admin._id})
    res.send(posts);
  }catch (error){
    res.status(400).send(error.message);
  }
});

router.put("/get", async (req, res) => {
  let post = await Post.findById(req.body.id);
  res.send(post);
});

module.exports = router;
