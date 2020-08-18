//importing modules
const express = require("express");
const cors = require("cors");
const EXPRESS_VALIDATOR = require('express-validator');

//importing files
const routes = require("./routes");
require("./env");

//initializing app
const app = express();
app.set("host", process.env.SERVER_HOST);
app.set("port", process.env.SERVER_PORT);

//middlewares
app.use(EXPRESS_VALIDATOR());
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", routes);

//for handling home paths
app.get("/", (req, res) =>
  res.json({ success: true, msg: "API is ready... use valid API" })
);

//for handling home paths
app.use((req, res) => res.json({ status: 404, msg: "Route not found" }));

// app.use(errorHandler.genericErrorHandler);
// app.use(errorHandler.notFound);

//for handling errors - error-handling-middleware
app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    msg: err.msg || err,
    status: err.status || 400,
  });
});

//listening port
app.listen(app.get("port"), app.get("host"), () => {
  console.log(`Server running on http://${app.get("host")}:${app.get("port")}`);
});
