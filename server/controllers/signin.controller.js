const jwt = require("jsonwebtoken");
const Users = require("../models/users.model");

async function signIn(req, res, next) {
  try {
    const user = await Users.authenticate(req.body.email, req.body.password);

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.json({
      token: `Bearer ${token}`,
      userId: user._id,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = signIn;
