const createError = require("http-errors");
const tasksService = require("../services/tasks.service");

const getTasks = async (req, res, next) => {
  try {
    const tasksList = await tasksService.getTasks(
      { ...req.params, ...req.query },
      {
        priorityIndex: -1,
      }
    );

    res.status(200).json(tasksList);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const newTask = await tasksService.createTask({
      ...req.params,
      ...req.body,
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await tasksService.updateTask(req.params.taskId, req.body);

    if (!task) throw createError(404, "Task not found");

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await tasksService.deleteTask(req.params.taskId);

    if (!task) throw createError(404, "Task not found");

    res.status(200).json({ _id: task._id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
