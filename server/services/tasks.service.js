const Tasks = require("../models/tasks.model");

function getTasks(filter, sort) {
  return Tasks.find(filter).sort(sort);
}

async function createTask(body) {
  const myIndex = await _myCounter.getIndex();

  body.priorityIndex = myIndex;

  return Tasks.create(body);
}

function updateTask(taskId, body) {
  return Tasks.findOneAndUpdate({ _id: taskId }, body, {
    new: true,
  });
}

function deleteTask(taskId) {
  return Tasks.findByIdAndDelete(taskId);
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
