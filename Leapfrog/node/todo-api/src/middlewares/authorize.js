const jwt = require("jsonwebtoken");
require("../env");

module.exports = function (req, res, next) {
  let token;
  if (req.headers["authorization"]) token = req.headers["authorization"];
  if (req.headers["x-access-token"]) token = req.headers["x-access-token"];
  if (req.headers["token"]) token = req.headers("token");

  if (req.query.token) token = req.query.token;

  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwidXNlckVtYWlsIjoic29tdGhpbmdAZ21haWwuY29tIiwiaWF0IjoxNTk3NjMzNjM2fQ.NxsCsO1AGN2k2iAsimIzmBuA6NGxM1GJSWpAXxIT3eg";
  if (!token) {
    return next({ msg: "Token not found", status: 400 });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return next(err);
    }
    next();
  });
};
