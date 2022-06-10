const Tasks = require("../models/tasks.model");
const _myCounter = require("../services/_counter.service");
const createError = require("http-errors");

const readTasks = async (req, res, next) => {
  try {
    const tasksMany = await Tasks.find({});

    res.status(200).json(tasksMany);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const myIndex = await _myCounter.getIndex();

    req.body.priorityIndex = myIndex;

    const newTask = await Tasks.create(req.body);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Tasks.findOneAndUpdate(
      { _id: req.params.taskId },
      req.body,
      {
        new: true,
      }
    );

    if (!task) throw createError(404, "Task not found");

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.taskId);

    if (!task) throw createError(404, "Task not found");

    res.status(200).json({ _id: task._id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  readTasks,
  createTask,
  updateTask,
  deleteTask,
};
