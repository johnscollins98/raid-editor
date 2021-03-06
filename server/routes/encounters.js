const router = require("express").Router({ mergeParams: true });
const logger = require("../utils/logging");

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
    if (!req.user) return res.status("403").json("Unauthenticated");

    const wing = await Wing.findOne({
      "encounters._id": req.params.encounter_id,
    });
    if (wing == null) return res.status(404).json("Encounter not found");
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );

    encounter.id = req.body.id;
    encounter.label = req.body.label;
    encounter.imageLink = req.body.imageLink;
    encounter.notes = req.body.notes;

    const newWing = await wing.save();
    logger.createLog(
      req.user.username,
      "updated",
      "encounter",
      req.params.encounter_id
    );
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.delete("/:encounter_id", async (req, res) => {
  try {
    if (!req.user) return res.status("403").json("Unauthenticated");

    const wing = await Wing.findOne({
      "encounters._id": req.params.encounter_id,
    });
    if (wing == null) return res.status(404).json("Encounter not found");
    const encounterIndex = wing.encounters.findIndex(
      (e) => e._id == req.params.encounter_id
    );
    wing.encounters.splice(encounterIndex, 1);
    const newWing = await wing.save();
    logger.createLog(
      req.user.username,
      "deleted",
      "encounter",
      req.params.wing_id
    );
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.user) return res.status("403").json("Unauthenticated");

    const wing = await Wing.findById(req.params.wing_id);
    if (wing == null) return res.status(404).json("Wing not found.");

    const newEncounter = {
      id: req.body.id,
      label: req.body.label,
      imageLink: req.body.imageLink,
      notes: req.body.notes,
      subgroups: [],
    };

    wing.encounters.push(newEncounter);
    const newWing = await wing.save();
    logger.createLog(
      req.user.username,
      "added",
      "encounter",
      req.params.wing_id
    );
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

const subgroupRoute = require("./subgroups");
router.use("/:encounter_id/subgroups/", subgroupRoute);

module.exports = router;
