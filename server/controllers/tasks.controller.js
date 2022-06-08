const Tasks = require("../models/tasks.model");
const _myCounter = require("../services/_counter.service");

const readMany = async (req, res, next) => {
  try {
    const tasksMany = await Tasks.find({});

    res.json(tasksMany);
  } catch (error) {
    res.json(error);
  }
};

const createOne = async (req, res) => {
  try {
    const myIndex = await _myCounter.getIndex();

    req.body.status = { value: "in-progress", index: myIndex };

    const newTask = await Tasks.create(req.body);

    res.json(newTask);
  } catch (error) {
    res.json(error);
  }
};

const updateOne = async (req, res) => {
  try {
    if (req.body.status) {
      const myIndex = await _myCounter.getIndex();
      req.body.status.index = myIndex;
    }

    const result = await req.myTask.updateOne(req.body);

    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const object = await Tasks.deleteOne({ _id: req.myTask._id });

    res.json(object.acknowledged);
  } catch (error) {
    res.json(error);
  }
};

const readById = async (req, res, next, taskId) => {
  try {
    req.myTask = await Tasks.findById(taskId);

    next();
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  readMany,
  createOne,
  updateOne,
  deleteOne,
  readById,
};
