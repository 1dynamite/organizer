const express = require("express");
const path = require("path");
const cors = require("cors");
const handleError = require("./helpers/handleError");
const usersRoutes = require("./routes/users.routes");
const signInController = require("./controllers/signin.controller");
const usersController = require("./controllers/users.controller");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

app.use("/api/sign-in", signInController);
app.use("/api/users", usersRoutes);
app.get("/api/confirm-email/:userId/:token", usersController.confirmEmail);

app.use((error, req, res, next) => {
  const myError = handleError(error);

  res.status(myError.status).json({
    status: myError.status,
    message: myError.message,
  });
});

module.exports = app;
