const express = require("express");
const controller = require("../controllers/projects.controller");

const router = express.Router();

router.get("/", controller.getManyProjects);
router.get("/:projectId", controller.getProject);

router.post("/", controller.createProject);

router.patch("/:projectId", controller.updateProject);

router.delete("/:projectId", controller.deleteProject);

module.exports = router;
