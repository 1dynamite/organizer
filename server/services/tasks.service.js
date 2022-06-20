const Tasks = require("../models/tasks.model");
const projectsService = require("../services/projects.service");
const _myCounter = require("../services/_counter.service");

function getTasks(filter, sort) {
  return Tasks.find(filter).sort(sort);
}

async function createTask(body) {
  const myIndex = await _myCounter.getIndex();

  body.priorityIndex = myIndex;

  const task = await Tasks.create(body);

  if (body.projectId) {
    await projectsService.updateProject(body.projectId, {
      $inc: { totalNumberOfTasks: 1 },
    });
  }

  return task;
}

async function updateTask(taskId, body) {
  const task = await Tasks.findOneAndUpdate({ _id: taskId }, body, {
    new: true,
  });

  if (body.completed && task.projectId) {
    await projectsService.updateProject(task.projectId, {
      $inc: { numberOfCompletedTasks: 1 },
    });
  }

  return task;
}

async function deleteTask(taskId) {
  const task = await Tasks.findByIdAndDelete(taskId);

  if (task.projectId) {
    await projectsService.updateProject(task.projectId, {
      $inc: { totalNumberOfTasks: -1 },
    });
  }

  return task;
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
