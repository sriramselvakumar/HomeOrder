const express = require("express");
const router = express.Router();
const { Admin } = require("../models/AdminModel");
const { Customer } = require("../models/CustomerModel");
const { Volunteer } = require("../models/VolunteerModel");
const jwt = require("jsonwebtoken");

router.get("/getUserType", async (req, res) => {
  const token = req.header("x-auth-token");
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  let user = await Admin.findById(payload.id);
  if (user) {
    return res.send("admin");
  }
  user = await Volunteer.findById(payload.id);
  if (user) {
    return res.send("volunteer");
  }
  user = await Customer.findById(payload.id);
  if (user) {
    return res.send("customer");
  }
});

router.get("/getUser", async (req, res) => {
  const token = req.header("x-auth-token");
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  let user = await Admin.findById(id);
  if (user) {
    return res.send(user._id);
  }
  user = await Volunteer.findById(id);
  if (user) {
    return res.send(user._id);
  }
  user = await Customer.findById(id);
  if (user) {
    return res.send(user._id);
  }
  return res.status(400).send("User not found");
});

module.exports = router;
