const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: [{ type: String }],
  cost: { type: Number },
  customer: { type: String },
  isDelivered: { type: Boolean },
  isAssigned: { type: Boolean },
  volunteer: { type: String },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports.Order = Order;
module.exports.OrderSchema = OrderSchema;
