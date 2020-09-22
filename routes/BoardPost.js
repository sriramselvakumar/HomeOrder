const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/Authentication");
const { Customer } = require("../models/CustomerModel");
const { Admin } = require("../models/AdminModel");
const { Volunteer } = require("../models/VolunteerModel");
const BoardPost = require("../models/BoardPost");
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

router.post("/", auth, upload.single("picture"), async (req, res) => {
  const { title, description } = req.body;
  const { id, type, user } = req.user;
  let post = new BoardPost({
    title,
    description,
    fileName: req.file.filename,
    author: id,
    comments: [],
    likes: [],
  });
  post = await post.save();
  let name = null;
  if (type === "Customer" || type === "Volunteer") {
    name = `${user.firstName} ${user.lastName}`;
  } else if (type === "Admin") {
    name = `${user.companyName}`;
  }
  const obj = {
    post,
    name,
  };
  res.send(obj);
});

const determineName = async (author) => {
  let name = null;
  let user = await Customer.findById(author);
  if (user) {
    return `${user.firstName} ${user.lastName}`;
  }
  user = await Volunteer.findById(author);
  if (user) {
    return `${user.firstName} ${user.lastName}`;
  }
  user = await Admin.findById(author);
  if (user) {
    return `${user.companyName}`;
  }
};

router.put("/addLike", auth, async (req, res) => {
  const { postID } = req.body;
  let post = await BoardPost.findById(postID);
  post.likes.push(req.user.id);
  await post.save();
});

router.put("/removeLike", auth, async (req, res) => {
  const { postID } = req.body;
  let post = await BoardPost.findById(postID);
  for (let a = 0; a < post.likes.length; a++) {
    if (post.likes[a] === req.user.id) {
      post.likes.splice(a, 1);
    }
  }
  await post.save();
});

router.get("/getAll", auth, async (req, res) => {
  const posts = await BoardPost.find();
  let postArray = [];
  for (let a = 0; a < posts.length; a++) {
    const { author, comments } = posts[a];
    let name = null;
    if (author === req.user.id) {
      name = "You";
    } else {
      name = await determineName(author);
    }
    let commentList = [];
    for (let b = 0; b < comments.length; b++) {
      let userName = null;
      if (comments[b].author === req.user.id) {
        userName = "You";
      } else {
        userName = await determineName(comments[b].author);
      }
      commentList.push({
        name: userName,
        comment: comments[b].comment,
      });
    }

    postArray.push({
      name,
      post: posts[a],
      id: req.user.id,
      comments: commentList,
    });
  }
  res.send(postArray);
});
router.put("/addComment", auth, async (req, res) => {
  const { id, comment } = req.body;
  let post = await BoardPost.findById(id);
  const obj = {
    author: req.user.id,
    comment,
  };
  post.comments.push(obj);
  await post.save();
});

router.get("/getComments/:id", auth, async (req, res) => {
  const id = req.params.id;
  const { comments } = await BoardPost.findById(id);
  let resList = [];
  for (let a = 0; a < comments.length; a++) {
    const { comment, author } = comments[a];
    let name = null;
    if (author === req.user.id) {
      name = "You";
    } else {
      name = determineName(author);
    }
    const obj = {
      name,
      comment,
    };
    resList.push(obj);
  }
  res.send(resList);
});
module.exports = router;
