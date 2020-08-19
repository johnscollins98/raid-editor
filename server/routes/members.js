const router = require("express").Router({ mergeParams: true });

let Wing = require("../models/wing.model");
const logger = require("../utils/logging");
const memberSchema = require("../models/member.schema");

router.get("/", async (req, res) => {
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
    res.json(subgroup.members);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.get("/:member_id", async (req, res) => {
  try {
    const wing = await Wing.findOne({
      "encounters.subgroups.members._id": req.params.member_id,
    });
    if (wing == null) return res.status(404).json("Member not found.");
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );
    const subgroup = encounter.subgroups.find(
      (s) => s._id == req.params.subgroup_id
    );
    const member = subgroup.members.find((m) => m._id == req.params.member_id);
    res.json(member);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.user) return res.status("403").json("Unauthenticated");

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
    const member = {
      name: req.body.name,
      role: req.body.role,
      profession: req.body.profession,
    };

    const totalMembers = encounter.subgroups.reduce(
      (total, currentSubgroup) => (total += currentSubgroup.members.length),
      0
    );

    if (totalMembers >= 10)
      return res.status(400).json("Encounter can only have 10 members total.");

    subgroup.members.push(member);
    const newWing = await wing.save();
    logger.createLog(
      req.user.username,
      "added",
      "member",
      req.params.subgroup_id
    );
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.put("/:member_id", async (req, res) => {
  try {
    if (!req.user) return res.status("403").json("Unauthenticated");

    const wing = await Wing.findOne({
      "encounters.subgroups.members._id": req.params.member_id,
    });
    if (wing == null) return res.status(404).json("Member not found.");
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );
    const subgroup = encounter.subgroups.find(
      (s) => s._id == req.params.subgroup_id
    );
    const member = subgroup.members.find((m) => m._id == req.params.member_id);

    member.name = req.body.name;
    member.role = req.body.role;
    member.profession = req.body.profession;

    const newWing = await wing.save();
    logger.createLog(
      req.user.username,
      "updated",
      "member",
      req.params.member_id
    );

    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.delete("/:member_id", async (req, res) => {
  try {
    if (!req.user) return res.status("403").json("Unauthenticated");

    const wing = await Wing.findOne({
      "encounters.subgroups.members._id": req.params.member_id,
    });
    if (wing == null) return res.status(404).json("Member not found.");
    const encounter = wing.encounters.find(
      (e) => e._id == req.params.encounter_id
    );
    const subgroup = encounter.subgroups.find(
      (s) => s._id == req.params.subgroup_id
    );

    const memberIndex = subgroup.members.findIndex(
      (m) => m._id == req.params.member_id
    );
    subgroup.members.splice(memberIndex, 1);
    const newWing = await wing.save();
    logger.createLog(
      req.user.username,
      "deleted",
      "member",
      req.params.subgroup_id
    );
    res.json(newWing);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

module.exports = router;
