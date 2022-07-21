const createError = require("http-errors");
const tasksService = require("../services/tasks.service");
const fs = require("fs");

const getTasks = async (req, res, next) => {
  try {
    let filterObj = {};
    Object.entries(req.query).forEach(([key, value]) => {
      if (key !== "page") filterObj[key] = value;
    });

    const tasksList = await tasksService.getTasks(
      { ...req.params, ...filterObj },
      {
        startDate: 1,
      },
      req.query.page
    );

    res.status(200).json(tasksList);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const startDate = new Date(req.body.startDate);

    if (!req.body.repeated) {
      const task = await tasksService.createTask({
        ...req.params,
        title: req.body.title,
        startDate,
        repeated: req.body.repeated,
      });

      const tasksList = await tasksService.getTasks(
        { ...req.params, status: "in-progress" },
        {
          startDate: 1,
        },
        1
      );

      res.status(201).json(tasksList);
    } else {
      for (let i = 0; i !== req.body.iterations; i++) {
        const task = await tasksService.createTask({
          ...req.params,
          title: req.body.title,
          startDate,
          repeated: req.body.repeated,
        });

        startDate.setDate(startDate.getDate() + req.body.interval);
      }

      const tasksList = await tasksService.getTasks(
        { ...req.params, status: "in-progress" },
        {
          startDate: 1,
        },
        1
      );

      res.status(201).json(tasksList);
    }
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
