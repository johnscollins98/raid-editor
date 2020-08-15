const router = require("express").Router();
let Wing = require("../models/wing.model");

router.get("/", async (req, res) => {
  try {
    const wing = await Wing.find();
    res.json(wing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const wing = await Wing.findById(req.params.id);
    if (wing == null) return res.status(404).json("Not found.");
    res.json(wing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const wing = new Wing({
      id: req.body.id,
      wingName: req.body.wingName,
      wingLabel: req.body.wingLabel,
    });
    const newWing = await wing.save();
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const wing = await Wing.findById(req.params.id);
    if (wing == null) return res.status(404).json("Not found.");
    wing.id = req.body.id;
    wing.wingName = req.body.wingName;
    wing.wingLabel = req.body.wingLabel;
    const updated = await wing.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const wing = await Wing.findByIdAndDelete(req.params.id);
    if (wing == null) return res.status(404).json("Not found.");
    res.json(wing);
  } catch (err) {
    res.status(400).json(`Error ${err}`);
  }
});

const encounterRoute = require("./encounters");
router.use("/:wing_id/encounters/", encounterRoute);

module.exports = router;
