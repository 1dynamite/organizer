const express = require("express");
const path = require("path");
const cors = require("cors");
const tasks = require("./routes/tasks.routes");
const Tasks = require("./models/tasks.model");
const handleError = require("./helpers/handleError");
const projectsRoutes = require("./routes/projects.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

app.use("/api/tasks", tasks);

app.use("/api/projects", projectsRoutes);

app.use((error, req, res, next) => {
  const myError = handleError(error);

  res.status(myError.status).json({
    status: myError.status,
    message: myError.message,
  });
});

module.exports = app;
