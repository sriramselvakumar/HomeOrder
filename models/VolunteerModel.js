const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const VolunteerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  isOnline: { type: Boolean, default: false },
  rewardPoints: { type: Number, default: 0 },
  rewardCustomer: { type: String },
  ordersCompleted: { type: Number, default: 0 },
});

VolunteerSchema.methods.generateJWT = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

module.exports.Volunteer = Volunteer;
module.exports.VolunteerSchema = VolunteerSchema;
