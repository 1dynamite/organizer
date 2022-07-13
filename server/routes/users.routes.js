const express = require("express");
const controller = require("../controllers/users.controller");
const validators = require("../validators/users.validator");
const tasksRoutes = require("./tasks.routes");
const projectsRoutes = require("./projects.routes");
const isSignedIn = require("../auth/is-signed-in");
const isAuthorized = require("../auth/is-authorized");

const router = express.Router();

router.post(
  "/",
  validators.validateCreateUser,
  controller.createUser,
  controller.createToken,
  controller.sendLinkToEmail
);

router.use("/:userId", isSignedIn, isAuthorized);

router
  .route("/:userId")
  .get(controller.getUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

router.use("/:userId/tasks", tasksRoutes);
router.use("/:userId/projects", projectsRoutes);

module.exports = router;
