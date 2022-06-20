const Joi = require("joi");
const createError = require("http-errors");

const ProjectSchema = Joi.object({
  title: Joi.string(),
  priorityIndex: Joi.number(),
});

const validateProject = (req, res, next) => {
  const { error } = ProjectSchema.validate(req.body);

  if (error) next(createError(422, error));
  next();
};

module.exports = {
  validateProject,
};
