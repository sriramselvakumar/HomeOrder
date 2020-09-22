const express = require("express");
const router = express.Router();
const { authCustomer, authVolunteer } = require("../middleware/Authentication");
const { Customer } = require("../models/CustomerModel");
const { Volunteer } = require("../models/VolunteerModel");

router.get("/profile", authCustomer, async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id);
    res.send(customer);
  } catch (error) {
    res.status(400).send("This customer does not exist");
  }
});

router.put("/addItem", authCustomer, async (req, res) => {
  try {
    const { id } = req.body;
    const customer = await Customer.findById(req.user.id);
    customer.cart.push(id);
    await customer.save();
    res.send("item added");
  } catch (error) {
    res.status(400).send("This customer does not exist");
  }
});

router.get("/customerInfo/:id", authVolunteer, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/changeAddress", authCustomer, async (req, res) => {
  const customer = await Customer.findById(req.user.id);
  const { state, city, street, code } = req.body;
  let address = `${street}, ${city}, ${state} ${code}`;
  customer.address = address;
  await customer.save();
  res.send(req.body);
});

router.get("/getRewardPoints", authCustomer, async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ rewardCustomer: req.user.id });
    let rewardPointsContainer = { rewardPoints: 0 };
    if (volunteer) {
      rewardPointsContainer.rewardPoints = volunteer.rewardPoints;
    }
    res.send(rewardPointsContainer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/spendRewardPoints", authCustomer, async (req, res) => {
  try {
    let volunteer = await Volunteer.findOne({ rewardCustomer: req.user.id });
    if (volunteer) {
      if (volunteer.rewardPoints >= req.body.points) {
        volunteer.rewardPoints -= req.body.points;
        await volunteer.save();
        res.status(200).send();
      } else {
        res.status(400).send("Not enough points");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
