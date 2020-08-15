const mongoose = require("mongoose");
const Encounter = require("./encounter.schema");

const Schema = mongoose.Schema;

const wingSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true },
    },
    wingLabel: {
      type: String,
      required: true,
      unique: true,
      index: { unique: true, dropDups: true },
    },
    wingName: {
      type: String,
      required: true,
    },
    encounters: {
      type: [Encounter],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wing = mongoose.model("Wing", wingSchema);

module.exports = Wing;
