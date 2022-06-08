const express = require("express");
const controller = require("../controllers/tasks.controller");

const router = express.Router();

router.get("/", controller.readMany);

router.post("/", controller.createOne);

router.put("/:taskId", controller.updateOne);

router.delete("/:taskId", controller.deleteOne);

router.param("taskId", controller.readById);

module.exports = router;
