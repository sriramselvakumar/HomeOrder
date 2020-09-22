const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketio = require("socket.io");
const Registration = require("./routes/Registration");
const Login = require("./routes/Login");
const Customer = require("./routes/Customer");
const Volunteer = require("./routes/Volunteer");
const Admin = require("./routes/Admin");
const Post = require("./routes/Post");
const User = require("./routes/User");
const Order = require("./routes/Order");
const BoardPost = require("./routes/BoardPost");
const Messages = require("./routes/Messages");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

const uri = process.env.ATLAS_URI || process.env.MONGODB_URI;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("You are connected to Mongo");
});

app.use("/api/register", Registration);
app.use("/api/login", Login);
app.use("/api/customer", Customer);
app.use("/api/volunteer", Volunteer);
app.use("/api/admin", Admin);
app.use("/api/post", Post);
app.use("/api/user", User);
app.use("/api/order", Order);
app.use("/api/BoardPost", BoardPost);
app.use("/api/chatMessages", Messages);
app.use("/uploads", express.static("uploads"));

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")));

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const server = app.listen(port, () => {
  console.log(`Express Server running on port ${port}`);
});

const io = socketio(server);
chatUsers = {};

io.on("connect", (socket) => {
  socket.on("joinChatRoom", ({ chatID, userID, userName }, callback) => {
    // if user isn't registered, add them
    if (!(userID in chatUsers)) {
      chatUsers[userID] = userName;
    }

    console.log("SUCCESSFULLY UPDATED USER LIST");
    for (const [userID, userName] of Object.entries(chatUsers)) {
      console.log(`- ${userID}: ${userName}`);
    }

    socket.join(chatID);
    console.log(`${userName} (${userID}) joined room ${chatID}`);

    callback();
  });

  socket.on("sendMessage", ({ chatID, userID, text }, callback) => {
    console.log(
      `chatID: ${chatID}, userID: ${userID}, userName: ${chatUsers[userID]}, text:\n${text}`
    );
    io.to(chatID).emit("message", {
      chatID,
      userName: chatUsers[userID],
      text,
    });
    callback();
  });
});
