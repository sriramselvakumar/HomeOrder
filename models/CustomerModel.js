const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  cart: [{ type: String }],
  orders: [{ type: String }],
});

CustomerSchema.methods.generateJWT = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports.Customer = Customer;
module.exports.CustomerSchema = CustomerSchema;
