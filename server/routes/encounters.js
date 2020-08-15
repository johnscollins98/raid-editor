const router = require("express").Router({ mergeParams: true });

let Wing = require("../models/wing.model");

router.get("/", async (req, res) => {
  try {
    const wing = await Wing.findById(req.params.wing_id);
    if (wing == null) return res.status(404).json("Wing not found.");
    res.json(wing.encounters);
  } catch (err) {
    res.json(`Error: ${err}`);
  }
});

router.get("/:encounter_id", async (req, res) => {
  try {
    const wing = await Wing.findOne({
      "encounters._id": req.params.encounter_id,
    });
    if (wing == null) return res.status(404).json("Encounter not found.");
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );
    res.json(encounter);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.put("/:encounter_id", async (req, res) => {
  try {
    const wing = await Wing.findOne({
      "encounters._id": req.params.encounter_id,
    });
    if (wing == null) return res.status(404).json("Encounter not found");
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );
    encounter.id = req.body.id;
    encounter.label = req.body.label;
    const newWing = await wing.save();
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.delete("/:encounter_id", async (req, res) => {
  try {
    const wing = await Wing.findOne({
      "encounters._id": req.params.encounter_id,
    });
    if (wing == null) return res.status(404).json("Encounter not found");
    const encounterIndex = wing.encounters.findIndex(
      (e) => e._id == req.params.encounter_id
    );
    wing.encounters.splice(encounterIndex, 1);
    const newWing = await wing.save();
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const wing = await Wing.findById(req.params.wing_id);
    if (wing == null) return res.status(404).json("Wing not found.");

    const newEncounter = {
      id: req.body.id,
      label: req.body.label,
      subgroups: [],
    };

    wing.encounters.push(newEncounter);
    const newWing = await wing.save();
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

const subgroupRoute = require("./subgroups");
router.use("/:encounter_id/subgroups/", subgroupRoute);

module.exports = router;
