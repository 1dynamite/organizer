const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    token: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tokens", TokenSchema);
