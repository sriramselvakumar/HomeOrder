const jwt = require("jsonwebtoken");
const { Volunteer } = require("../models/VolunteerModel");
const { Admin } = require("../models/AdminModel");
const { Customer } = require("../models/CustomerModel");
require("dotenv").config();

async function authVolunteer(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).send("Invalid token");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    let volunteer = await Volunteer.findById(payload.id);
    if (!volunteer) {
      return res.status(400).send("Invalid token");
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
}

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).send("Invalid token");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    let user = await Volunteer.findById(payload.id);
    if (user) {
      req.user = payload;
      next();
      return;
    }
    user = await Admin.findById(payload.id);
    if (user) {
      req.user = payload;
      next();
      return;
    }
    user = await Customer.findById(payload.id);
    if (user) {
      req.user = payload;
      next();
      return;
    }
    return res.status(400).send("There was no user with the given token");
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
}

async function authAdmin(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).send("Invalid token");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    let admin = await Admin.findById(payload.id);
    if (!admin) {
      return res.status(400).send("Invalid token");
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
}

async function authCustomer(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).send("Invalid token");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    let customer = await Customer.findById(payload.id);
    if (!customer) {
      return res.status(400).send("Invalid token");
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
}

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).send("Invalid token");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    let user = await Customer.findById(payload.id);
    if (user) {
      req.user = {
        id: payload.id,
        type: "Customer",
        user,
      };
      next();
      return;
    }
    user = await Admin.findById(payload.id);
    if (user) {
      req.user = {
        id: payload.id,
        type: "Admin",
        user,
      };
      next();
      return;
    }
    user = await Volunteer.findById(payload.id);
    if (user) {
      req.user = {
        id: payload.id,
        type: "Volunteer",
        user,
      };
      next();
      return;
    }
    return res.status(400).send("Invalid token");
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
}
module.exports.authVolunteer = authVolunteer;
module.exports.authAdmin = authAdmin;
module.exports.authCustomer = authCustomer;
module.exports.auth = auth;
