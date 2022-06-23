const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const createError = require("http-errors");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, "Nickname is required"],
    },

    email: {
      type: String,
      unique: [true],
    },

    hashedPassword: String,

    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const setPassword = function (val) {
  this.hashedPassword = bcrypt.hashSync(val, 10);
};

UserSchema.virtual("password").set(setPassword);

UserSchema.statics = {
  async authenticate(email, pwd) {
    const user = await this.findOne({ email }).exec();

    if (user && bcrypt.compareSync(pwd, user.hashedPassword)) {
      if (user.active) return user;

      throw createError(404, "Please, activate your email");
    }

    if (user) throw createError(400, "Wrong password");

    throw createError(404, "User does not exist; Try a different email");
  },
};

UserSchema.plugin(uniqueValidator, {
  message: "This {PATH} already exists",
});

module.exports = mongoose.model("Users", UserSchema);
