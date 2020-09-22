const express = require("express");
const router = express.Router();
const { Customer } = require("../models/CustomerModel");
const { Admin } = require("../models/AdminModel");
const { Volunteer } = require("../models/VolunteerModel");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/customer", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  let customer = await Customer.findOne({ email });
  if (customer) {
    return res.status(400).send("User already exists");
  }
  customer = new Customer({
    firstName: firstname,
    lastName: lastname,
    email,
    address: "",
    password,
    cart: [],
    orders: [],
  });
  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);
  await customer.save();
  const token = customer.generateJWT();
  res.header("x-auth-token", token).send(token);
});

router.post("/admin", async (req, res) => {
  const { firstname, lastname, email, password, companyname } = req.body;
  let admin = await Admin.findOne({ email });
  if (admin) {
    return res.status(400).send("User already exists");
  }
  admin = new Admin({
    companyName: companyname,
    firstName: firstname,
    lastName: lastname,
    email,
    password,
    posts: [],
    address: "",
  });
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  await admin.save();
  const token = admin.generateJWT();
  res.header("x-auth-token", token).send(token);
});

router.post("/volunteer", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  let volunteer = await Volunteer.findOne({ email });
  if (volunteer) {
    return res.status(400).send("User already exists");
  }
  volunteer = new Volunteer({
    firstName: firstname,
    lastName: lastname,
    email,
    password,
    address: "",
    rewardCustomer: "",
  });
  const salt = await bcrypt.genSalt(10);
  volunteer.password = await bcrypt.hash(volunteer.password, salt);
  await volunteer.save();
  const token = volunteer.generateJWT();
  res.header("x-auth-token", token).send(token);
});

router.post("/validate", async (req, res) => {
  const { firstname, lastname, email, password, mode, companyname } = req.body;
  let messages = [];

  if (mode === "customer") {
    let customer = await Customer.findOne({ email });
    if (customer) {
      messages.push("This email is already in use with a customer account");
    }
  } else if (mode === "volunteer") {
    let volunteer = await Volunteer.findOne({ email });
    if (volunteer) {
      messages.push("This email is already in use with a volunteer account");
    }
  } else if (mode === "admin") {
    let admin = await Admin.findOne({ email });
    if (admin) {
      messages.push("This email is already in use with an admin account");
    }
    if (companyname.length === 0) {
      messages.push("Please enter your company name");
    }
  }
  if (firstname.length === 0) {
    messages.push("Please enter your first name");
  }
  if (lastname.length === 0) {
    messages.push("Please enter your last name");
  }
  if (email.length === 0) {
    messages.push("Please enter your email");
  }
  if (password.length < 9) {
    messages.push("Password has to be 9 characters long");
  }
  if (messages.length > 0) {
    return res.send(messages);
  }
  return res.send(true);
});

module.exports = router;
