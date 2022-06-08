const mongoose = require("mongoose");
const _myCounter = require("../../services/_counter.service");

const StatusSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: "Status value is required",
      enum: {
        values: ["in-progress", "completed"],
        message: "'{VALUE}' is not a valid value for status",
      },
    },
    index: {
      type: Number,
      required: [true, "Index number is required"],
    },
  },
  { _id: false }
);

module.exports = StatusSchema;
