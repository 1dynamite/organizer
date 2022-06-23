const express = require("express");
const controller = require("../controllers/projects.controller");
const validators = require("../validators/projects.validator");

const router = express.Router();

router.get("/", controller.getManyProjects);
router.get("/:projectId", controller.getProject);

router.post("/", validators.validateProject, controller.createProject);

router.patch(
  "/:projectId",
  validators.validateProject,
  controller.updateProject
);

router.delete("/:projectId", controller.deleteProject);

module.exports = router;
