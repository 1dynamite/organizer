const Projects = require("../models/projects.model");
const _myCounter = require("../services/_counter.service");
const createError = require("http-errors");
const Tasks = require("../models/tasks.model");

const getManyProjects = async (req, res, next) => {
  try {
    const projectsList = await Projects.find({}).sort({
      priorityIndex: -1,
    });

    res.status(200).json(projectsList);
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await Projects.findById(req.params.projectId);

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const myIndex = await _myCounter.getIndex();

    req.body.priorityIndex = myIndex;

    const newProject = await Projects.create(req.body);

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Projects.findOneAndUpdate(
      { _id: req.params.projectId },
      req.body,
      {
        new: true,
      }
    );

    if (!project) throw createError(404, "Project not found");

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Projects.findByIdAndDelete(req.params.projectId);

    if (!project) throw createError(404, "Project not found");

    res.status(200).json({ _id: project._id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getManyProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
