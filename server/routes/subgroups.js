const router = require("express").Router({ mergeParams: true });

let Wing = require("../models/wing.model");

router.get("/", async (req, res) => {
  try {
    const wing = await Wing.findOne({
      "encounters._id": req.params.encounter_id,
    });
    if (wing == null) return res.status(404).json("Encounter not found");
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );
    res.json(encounter.subgroups);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.get("/:subgroup_id", async (req, res) => {
  try {
    const wing = await Wing.findOne({
      "encounters.subgroups._id": req.params.subgroup_id,
    });
    if (wing == null) return res.status(404).json("Subgroup not found.");
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );
    const subgroup = encounter.subgroups.find(
      (s) => s._id == req.params.subgroup_id
    );
    res.json(subgroup);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const wing = await Wing.findOne({
      "encounters._id": req.params.encounter_id,
    });
    if (wing == null) return res.status(404).json("Encounter not found.");
    const subgroup = {
      label: req.body.label,
      members: [],
    };
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );
    encounter.subgroups.push(subgroup);
    const newWing = await wing.save();
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.put("/:subgroup_id", async (req, res) => {
  try {
    const wing = await Wing.findOne({
      "encounters.subgroups._id": req.params.subgroup_id,
    });
    if (wing == null) return res.status(404).json("Subgroup not found.");
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );
    const subgroup = encounter.subgroups.find(
      (s) => s._id == req.params.subgroup_id
    );
    subgroup.label = req.body.label;
    const newWing = await wing.save();
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.delete("/:subgroup_id", async (req, res) => {
  try {
    const wing = await Wing.findOne({
      "encounters.subgroups._id": req.params.subgroup_id,
    });
    if (wing == null) return res.status(404).json("Subgroup not found.");
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );
    const subgroupIndex = encounter.subgroups.findIndex(
      (s) => s._id == req.params.subgroup_id
    );
    encounter.subgroups.splice(subgroupIndex, 1);
    const newWing = await wing.save();
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

const membersRoute = require("./members");
router.use("/:subgroup_id/members/", membersRoute);

module.exports = router;
