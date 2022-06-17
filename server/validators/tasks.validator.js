const Joi = require("joi");
const createError = require("http-errors");

const TaskSchema = Joi.object({
  title: Joi.string(),

  completed: Joi.date(),
  status: Joi.string(),
  priorityIndex: Joi.number(),
  projectId: Joi.string(),
}).with("status", "completed");

const validateTask = (req, res, next) => {
  const { error } = TaskSchema.validate(req.body);

  if (error) next(createError(422, error));
  next();
};

module.exports = {
  validateTask,
};
