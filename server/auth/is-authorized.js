const createError = require("http-errors");

const isAuthorized = (req, res, next) => {
  const yes = req.user._id.toString() === req.params.userId;

  if (yes) next();
  else
    next(createError(403, "Unauthorized: you cannot access other users' data"));
};

module.exports = isAuthorized;
