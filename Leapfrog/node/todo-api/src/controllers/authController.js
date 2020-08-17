const pool = require("../db");
const bcrypt = require("bcryptjs");
const helper = require("../utils/helper");

const saltRounds = 10; // saltRounds for bycrypt

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    const { hash_password } = user.rows[0];
    const db_email = user.rows[0].email;
    if (email !== db_email) next({ msg: "email not found", status: 404 });
    bcrypt.compare(password, hash_password, function (err, result) {
      // result == true
      if (err) {
        return next(err);
      }
      let data = { email };
      let token = helper.createToken(data);
      res.json({ data, token });
    });
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

const register = async (req, res, next) => {
  try {
    // const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
    const { email, password } = req.body;
    //verify email and password

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return next(err);
        }
        const query =
          "INSERT INTO users (email, hash_password) VALUES ($1, $2) RETURNING *";
        const value = [email, hash];
        const todo = await pool.query(query, value);
        res.json(todo.rows[0]);
        // Store hash in your password DB.
      });
    });
  } catch (err) {
    next(err);
    console.log(err);
    logger.error(err);
  }
};

module.exports = { login, register };
