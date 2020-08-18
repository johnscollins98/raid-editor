const mongoose = require("mongoose");
const Subgroup = require("./subgroup.schema");

const Schema = mongoose.Schema;

const encounterSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      index: {
        unique: true,
        sparse: true,
      },
    },
    label: {
      type: String,
      required: true,
      index: {
        unique: true,
        sparse: true,
      },
    },
    imageLink: {
      type: String,
    },
    notes: {
      type: String,
    },
    subgroups: {
      type: [Subgroup],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = encounterSchema;
