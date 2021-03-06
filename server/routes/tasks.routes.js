const express = require("express");
const controller = require("../controllers/tasks.controller");
const validators = require("../validators/tasks.validator");

const router = express.Router({ mergeParams: true });

router.get("/", controller.getTasks);

router.post("/", validators.validateTask, controller.createTask);

router.patch("/:taskId", validators.validateTask, controller.updateTask);

router.delete("/:taskId", controller.deleteTask);

module.exports = router;
