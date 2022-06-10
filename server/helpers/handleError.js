const mongoose = require("mongoose");
const createError = require("http-errors");

function handleError(error) {
  if (error instanceof mongoose.Error.ValidationError)
    return createError(422, parseValidationErrorMessage(error.message));

  if (error instanceof mongoose.Error.CastError) {
    if (error.kind === "ObjectId") return createError(422, "Invalid ID");
  }

  if (error.status) return error;

  return createError(500, "Something went wrong");
}

function parseValidationErrorMessage(message) {
  return message.split(":")[2];
}

module.exports = handleError;
