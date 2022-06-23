const Joi = require("joi");
const createError = require("http-errors");

const CreateUserSchema = Joi.object({
  nickname: Joi.string().required(),

  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

const UpdateUserSchema = Joi.object({
  nickname: Joi.string().required(),
});

const validateUpdateUser = (req, res, next) => {
  const { error } = UpdateUserSchema.validate(req.body);

  if (error) next(createError(422, error));
  next();
};

const validateCreateUser = (req, res, next) => {
  const { error } = CreateUserSchema.validate(req.body);

  if (error) next(createError(422, error));
  next();
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};
