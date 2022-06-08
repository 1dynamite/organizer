const express = require("express");
const path = require("path");
const cors = require("cors");
const tasks = require("./routes/tasks.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

app.use("/api/tasks", tasks);

app.use((err, req, res, next) => {
  console.log(err);

  res.end(err);
});

module.exports = app;
