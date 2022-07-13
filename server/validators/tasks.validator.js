const Joi = require("joi");
const createError = require("http-errors");

const TaskSchema = Joi.object({
  title: Joi.string(),

  completed: Joi.date(),
  status: Joi.string(),
  priorityIndex: Joi.number(),
  interval: Joi.number(),
  startDate: Joi.date(),
  iterations: Joi.number(),
  repeated: Joi.boolean(),
}).with("status", "completed");

const validateTask = (req, res, next) => {
  const { error } = TaskSchema.validate(req.body);

  if (error) next(createError(422, error));
  next();
};

module.exports = {
  validateTask,
};
