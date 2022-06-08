const mongoose = require("mongoose");
const StatusSchema = require("./schemas/status");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    status: {
      type: StatusSchema,
      required: [true, "Status is required"],
    },

    completed: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tasks", TaskSchema);
