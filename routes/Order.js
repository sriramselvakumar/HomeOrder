const express = require("express");
const router = express.Router();
const { authCustomer, authVolunteer } = require("../middleware/Authentication");
const { Customer } = require("../models/CustomerModel");
const { Order } = require("../models/Order");
const { Post } = require("../models/PostModel");
const { Admin } = require("../models/AdminModel");
const { Volunteer } = require("../models/VolunteerModel");
const axios = require("axios");

router.post("/postOrder", authCustomer, async (req, res) => {
  let customer = await Customer.findById(req.user.id);
  const { price } = req.body;
  let order = new Order({
    items: [...customer.cart],
    cost: price,
    customer: req.user.id,
    isDelivered: false,
    isAssigned: false,
    volunteer: "",
  });

  const { cart } = customer;
  for (let a = 0; a < cart.length; a++) {
    const post = await Post.findById(cart[a]);
    post.purchased += 1;
    await post.save();
  }
  order = await order.save();
  customer.cart = [];
  customer.orders.push(order._id);
  await customer.save();
});

router.put("/confirmDelivery", authCustomer, async (req, res) => {
  const { id } = req.body;
  let order = await Order.findById(id);
  order.isDelivered = true;
  Volunteer.findById(order.volunteer);
  const { ordersCompleted, rewardPoints } = volunteer;
  if (ordersCompleted < 15) {
    volunteer.rewardPoints = rewardPoints + 1;
  } else if (ordersCompleted < 50) {
    volunteer.rewardPoints = rewardPoints + 2;
  } else if (ordersCompleted >= 50) {
    volunteer.rewardPoints = rewardPoints + 3;
  }
  volunteer.ordersCompleted = ordersCompleted + 1;
  await volunteer.save();
  await order.save();
});

router.get("/getCustomerOrders", authCustomer, async (req, res) => {
  const orders = await Order.find();
  let list = [];
  for (let a = 0; a < orders.length; a++) {
    const { customer, isDelivered, isAssigned, items, _id } = orders[a];
    if (customer === req.user.id && !isDelivered) {
      let itemArray = [];
      for (let a = 0; a < items.length; a++) {
        const { postName } = await Post.findById(items[a]);
        itemArray.push(postName);
      }
      const obj = {
        id: _id,
        isAssigned,
        itemArray,
      };
      list.push(obj);
    }
  }
  res.send(list);
});

router.put("/removePendingOrder", authCustomer, async (req, res) => {
  let customer = await Customer.findById(req.user.id);
  customer.cart = [];
  await customer.save();
});

router.get("/getOrders", async (req, res) => {
  try {
    let orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/assignVolunteer", authVolunteer, async (req, res) => {
  const { id } = req.body;
  let order = await Order.findById(id);
  order.volunteer = req.user.id;
  order.isAssigned = true;
  await order.save();
});

router.get("/getVolunteerOrders", authVolunteer, async (req, res) => {
  const orders = await Order.find();
  let filtered = orders.filter((order) => order.volunteer == req.user.id);

  let response = filtered.filter((order) => order.isDelivered == false);
  return res.send(response);
});

router.get("/get!PickedOrders", authVolunteer, async (req, res) => {
  const { address } = await Volunteer.findById(req.user.id);
  if (address === "") {
    return res.send("address empty");
  }
  const orders = await Order.find();
  pickups = [];
  for (let a = 0; a < orders.length; a++) {
    const { items, isAssigned, customer, _id } = orders[a];
    if (!isAssigned) {
      let locations = [address];
      let adminMap = new Map();
      for (let a = 0; a < items.length; a++) {
        const { author } = await Post.findById(items[a]);
        if (!adminMap.has(author)) {
          const admin = await Admin.findById(author);
          adminMap.set(author, 1);
          locations.push(admin.address);
        }
      }
      const shopper = await Customer.findById(customer);
      locations.push(shopper.address);

      const options = {
        url: process.env.MAPQUEST,
        json: {
          locations,
        },
      };
      const { data } = await axios.post(options.url, options.json);
      let obj = {
        itemLength: items.length,
        APIData: data.route,
        _id,
      };
      pickups.push(obj);
    }
  }
  res.send(pickups);
});

router.get("/getOrder/:id", authVolunteer, async (req, res) => {
  const volunteer = await Volunteer.findById(req.user.id);
  const {
    items,
    customer,
    isAssigned,
    isDelivered,
    cost,
    _id,
  } = await Order.findById(req.params.id);
  let itemsArray = [];
  let itemsMap = new Map();
  for (let a = 0; a < items.length; a++) {
    if (!itemsMap.has(items[a])) {
      const {
        _id,
        author,
        category,
        postName,
        price,
        stock,
      } = await Post.findById(items[a]);
      itemsArray.push({
        _id,
        author,
        category,
        postName,
        price,
        stock,
        count: 1,
      });
      itemsMap.set(items[a], itemsArray.length - 1);
    } else {
      let item = itemsArray[itemsMap.get(items[a])];
      item.count += 1;
      itemsArray[itemsMap.get(items[a])] = item;
    }
  }
  itemsMap.clear();
  let pickups = [];
  for (let a = 0; a < itemsArray.length; a++) {
    const { author } = itemsArray[a];
    if (!itemsMap.has(author)) {
      const { companyName, address, _id } = await Admin.findById(author);
      products = [itemsArray[a]];
      let obj = {
        companyName,
        address,
        products,
        _id,
      };
      pickups.push(obj);
      itemsMap.set(author, pickups.length - 1);
    } else if (itemsMap.has(author)) {
      let pickup = pickups[itemsMap.get(author)];
      pickup.products.push(itemsArray[a]);
      pickups[itemsMap.get(author)] = pickup;
    }
  }
  const shopper = await Customer.findById(customer);
  const locations = [volunteer.address];
  for (let a = 0; a < pickups.length; a++) {
    locations.push(pickups[a].address);
  }
  locations.push(shopper.address);
  const options = {
    url: process.env.MAPQUEST,
    json: {
      locations,
    },
  };
  const { data } = await axios.post(options.url, options.json);
  const sequence = data.route.locationSequence;
  let sequencedPickup = [];
  for (let a = 1; a < sequence.length - 1; a++) {
    sequencedPickup.push(pickups[sequence[a] - 1]);
  }
  obj = {
    customer: shopper,
    pickups: sequencedPickup,
    isAssigned,
    isDelivered,
    cost,
    _id,
    sequence,
  };
  res.send(obj);
});

module.exports = router;
