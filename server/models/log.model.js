const mongoose = require("mongoose");
const Encounter = require("./encounter.schema");

const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: ["added", "updated", "deleted"],
    },
    dataType: {
      type: String,
      required: true,
      enum: ["member", "encounter", "wing", "subgroup"],
    },
    changedId: {
      type: Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
