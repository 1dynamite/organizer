const createError = require("http-errors");
const usersService = require("../services/users.service");
const nodemailer = require("nodemailer");
const Tokens = require("../models/tokens.model");
const crypto = require("crypto");
const ejs = require("ejs");
const path = require("path");

const getUser = async (req, res, next) => {
  try {
    const user = await usersService.getUser(req.params.userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const newUser = await usersService.createUser(req.body);

    req.user = newUser;

    next();
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.params.userId, req.body);

    if (!user) throw createError(404, "User not found");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await usersService.deleteUser(req.params.userId);

    if (!user) throw createError(404, "User not found");

    res.status(200).json({ _id: user._id });
  } catch (error) {
    next(error);
  }
};

const createToken = async (req, res, next) => {
  const doc = {
    userId: req.user._id,
    token: crypto.randomBytes(32).toString("hex"),
  };

  const newToken = await Tokens.create(doc);

  req.token = newToken;

  next();
};

const sendLinkToEmail = async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "s.turaev.lab@gmail.com",
      pass: "ryyhrgzqgtqkjblj",
    },
  });

  const html = await ejs.renderFile(
    path.resolve(__dirname, "../email.template.ejs"),
    {
      userId: req.token.userId,
      token: req.token.token,
    },
    { async: true }
  );

  const mailOptions = {
    from: "s.turaev.lab@gmail.com",
    to: req.user.email,
    subject: "Confirm your email",
    html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      next(error);
    } else {
      res.status(200).json(info);
    }
  });
};

const confirmEmail = async (req, res, next) => {
  const token = await Tokens.findOne({
    userId: req.params.userId,
    token: req.params.token,
  });

  if (token) {
    await usersService.updateUser(token.userId, { active: true });

    res.status(201).json({});
  } else next(createError(400, "Invalid link"));
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  sendLinkToEmail,
  confirmEmail,
  createToken,
};
