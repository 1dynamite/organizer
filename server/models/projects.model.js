const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    priorityIndex: Number,

    numberOfCompletedTasks: {
      type: Number,
      default: 0,
    },

    totalNumberOfTasks: {
      type: Number,
      default: 0,
    },

    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Projects", ProjectSchema);
