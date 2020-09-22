const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AdminSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  posts: [{ type: String }],
});

AdminSchema.methods.generateJWT = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports.Admin = Admin;
module.exports.AdminSchema = AdminSchema;
