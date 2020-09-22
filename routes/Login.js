const express = require("express");
const router = express.Router();
const { Customer } = require("../models/CustomerModel");
const { Admin } = require("../models/AdminModel");
const { Volunteer } = require("../models/VolunteerModel");
const bcrypt = require("bcrypt");

router.post("/customer", async (req, res) => {
  const { email, password } = req.body;
  let customer = await Customer.findOne({ email });
  if (!customer) {
    console.log("user does not exist");
    return res.status(400).send("Invalid email or password");
  }
  let isValidUser = await bcrypt.compare(password, customer.password);
  if (!isValidUser) {
    console.log("wrong password");
    return res.status(400).send("Invalid email or password");
  }
  const token = customer.generateJWT();
  res.header("x-auth-token", token).send(token);
});

router.post("/admin", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).send("Invalid email or password");
  }
  let isValidUser = await bcrypt.compare(password, admin.password);
  if (!isValidUser) {
    return res.status(400).send("Invalid email or password");
  }
  const token = admin.generateJWT();
  res.header("x-auth-token", token).send(token);
});

router.post("/volunteer", async (req, res) => {
  const { email, password } = req.body;
  const volunteer = await Volunteer.findOne({ email });
  if (!volunteer) {
    return res.status(400).send("Invalid email or password");
  }
  let isValidUser = await bcrypt.compare(password, volunteer.password);
  if (!isValidUser) {
    return res.status(400).send("Invalid email or password");
  }
  const token = volunteer.generateJWT();
  res.header("x-auth-token", token).send(token);
});

router.post("/validation", async (req, res) => {
  const { email, password, account } = req.body;
  if (account === "") {
    return res.send("Choose an account");
  }
  if (account === "customer") {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.send("Invalid Username and Password");
    }
    const isValidUser = await bcrypt.compare(password, customer.password);
    if (!isValidUser) {
      return res.send("Invalid Username and Password");
    }
    return res.send(true);
  } else if (account === "admin") {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.send("Invalid Username and Password");
    }
    const isValidUser = await bcrypt.compare(password, admin.password);
    if (!isValidUser) {
      return res.send("Invalid Username and Password");
    }
    return res.send(true);
  } else if (account === "volunteer") {
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res.send("Invalid Username and Password");
    }
    const isValidUser = await bcrypt.compare(password, volunteer.password);
    if (!isValidUser) {
      return res.send("Invalid Username and Password");
    }
    return res.send(true);
  }
});

module.exports = router;
