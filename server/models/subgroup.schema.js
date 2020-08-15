const mongoose = require("mongoose");
const Member = require("./member.schema");

const Schema = mongoose.Schema;

const subgroupSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    members: {
      type: [Member],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = subgroupSchema;
