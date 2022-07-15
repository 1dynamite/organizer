const Projects = require("../models/projects.model");
const _myCounter = require("../services/_counter.service");

function getManyProjects(filter, sort) {
  return Projects.find(filter).sort(sort);
}

function getProject(projectId) {
  return Projects.findById(projectId);
}

async function createProject(body) {
  const myIndex = await _myCounter.getIndex();

  body.priorityIndex = myIndex;

  return Projects.create(body);
}

function updateProject(projectId, body) {
  return Projects.findOneAndUpdate({ _id: projectId }, body, {
    new: true,
  });
}

function deleteProject(projectId) {
  return Projects.findByIdAndDelete(projectId);
}

module.exports = {
  getManyProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
