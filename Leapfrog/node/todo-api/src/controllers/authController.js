const pool = require("../db");
const helper = require("../utils/helper");

const login = async (req, res, next) => {
  try {
    // const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
    let data = { id: 1, role: "admin", userEmail: "somthing@gmail.com" };
    let token = helper.createToken(data);
    console.log(token)
    res.json({ user: data, token });
  } catch (err) {
    next(err);
    console.log(err);
    logger.error(err);
  }
};

const register = async (req, res, next) => {
  try {
    // const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
    res.json({ msg: "trying to register" });
  } catch (err) {
    next(err);
    console.log(err);
    logger.error(err);
  }
};

module.exports = { login, register };
