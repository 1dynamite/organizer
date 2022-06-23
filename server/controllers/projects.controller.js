const createError = require("http-errors");
const projectsService = require("../services/projects.service");

const getManyProjects = async (req, res, next) => {
  try {
    const projectsList = await projectsService.getManyProjects(
      { userId: req.params.userId },
      {
        priorityIndex: -1,
      }
    );

    res.status(200).json(projectsList);
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await projectsService.getProject(req.params.projectId);

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const newProject = await projectsService.createProject({
      userId: req.params.userId,
      ...req.body,
    });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await projectsService.updateProject(
      req.params.projectId,
      req.body
    );

    if (!project) throw createError(404, "Project not found");

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await projectsService.deleteProject(req.params.projectId);

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
