const express = require("express");
const path = require("path");
const cors = require("cors");
const tasks = require("./routes/tasks.routes");
const handleError = require("./helpers/handleError");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

app.use("/api/tasks", tasks);

app.use((error, req, res, next) => {
  const myError = handleError(error);

  res.status(myError.status).json({
    status: myError.status,
    message: myError.message,
  });
});

module.exports = app;
