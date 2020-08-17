const express = require("express");
const cors = require("cors");
const app = express();

const routes = require("./routes");
const logger = require("./utils/logger");
const errorHandler = require("./middlewares/errorHandler");
const pool = require("./db");
require("./env");

app.set("host", process.env.SERVER_HOST);
app.set("port", process.env.SERVER_PORT);


app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", routes);

app.get("/", (req, res) =>
  res.json({ success: true, msg: "API is ready... use valid API" })
);

app.use((req, res) => res.json({ status: 404, msg: "Route not found" }));

// app.use(errorHandler.genericErrorHandler);
// app.use(errorHandler.notFound);

app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    msg: err.msg || err,
    status: err.status || 400,
  });
});

app.listen(app.get("port"), app.get("host"), () => {
  console.log(`Server running on http://${app.get("host")}:${app.get("port")}`);
});
