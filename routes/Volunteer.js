const express = require("express");
const router = express.Router();
const { Volunteer } = require("../models/VolunteerModel");
const { authVolunteer, authCustomer } = require("../middleware/Authentication");
router.get("/profile", authVolunteer, async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.user.id);
    res.send(volunteer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/changeAddress", authVolunteer, async (req, res) => {
  let volunteer = await Volunteer.findById(req.user.id);
  const { street, city, state, code } = req.body;
  volunteer.address = `${street}, ${city}, ${state} ${code}`;
  await volunteer.save();
});

router.put("/changeRewardCustomer", authVolunteer, async (req, res) => {
  try {
    let volunteer = await Volunteer.findById(req.user.id);
    volunteer.rewardCustomer = req.body.id;
    await volunteer.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/addRewardPoints", authVolunteer, async (req, res) => {
  try {
    await Volunteer.findAndModify({
      query: { _id: req.user.id },
      update: { $inc: { rewardPoints: req.body.points } },
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
