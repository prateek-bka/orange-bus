const busModel = require("../models/busModel");

const router = require("express").Router();

// add-bus

router.post("/add-bus", async (req, res) => {
  try {
    const existingBus = await busModel.findOne({
      busNumber: req.body.busNumber,
    });
    if (existingBus) {
      return res
        .status(200)
        .send({ success: false, message: "Bus already exists" });
    }

    const newBus = new busModel(req.body);
    await newBus.save();
    return res.status(200).send({
      success: true,
      message: "Bus added successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
