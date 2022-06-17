const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    priorityIndex: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Projects", ProjectSchema);
