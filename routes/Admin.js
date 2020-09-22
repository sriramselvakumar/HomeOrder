const express = require("express");
const router = express.Router();
const { authAdmin } = require("../middleware/Authentication");
const { Admin } = require("../models/AdminModel");

router.get("/profile", authAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (admin) {
      return res.send(admin);
    }
    res.send(false);
  } catch (error) {
    res.status(400).send("This admin does not exist");
  }
});

router.put("/changeAddress", authAdmin, async (req, res) => {
  let admin = await Admin.findById(req.user.id);
  const { city, state, street, code } = req.body;
  admin.address = `${street}, ${city}, ${state} ${code}`;
  await admin.save();
});

module.exports = router;
