const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    status: {
      type: String,
      enum: {
        values: ["in-progress", "completed"],
        message: "'{VALUE}' is not a valid value for status",
      },
      default: "in-progress",
    },

    completed: Date,

    priorityIndex: Number,

    projectId: mongoose.Types.ObjectId,

    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User ID is required"],
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    repeated: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tasks", TaskSchema);
