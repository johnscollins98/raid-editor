const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      enum: [
        "guardian",
        "dragonhunter",
        "firebrand",
        "warrior",
        "berserker",
        "spellbreaker",
        "revenant",
        "herald",
        "renegade",
        "ranger",
        "druid",
        "soulbeast",
        "thief",
        "daredevil",
        "deadeye",
        "engineer",
        "scrapper",
        "holosmith",
        "mesmer",
        "chronomancer",
        "mirage",
        "elementalist",
        "tempest",
        "weaver",
        "necromancer",
        "reaper",
        "scourge",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = memberSchema;
