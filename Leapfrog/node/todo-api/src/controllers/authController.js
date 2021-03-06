const pool = require("../db");
const bcrypt = require("bcrypt");
const helper = require("../utils/helper");

const saltRounds = 10; // saltRounds for bycrypt

const login = async (req, res, next) => {
  try {
    req
      .checkBody("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a proper email, eg: example@xyz.abc");

    req
      .checkBody("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters");

    let errors = req.validationErrors();
    console.log(errors);
    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const { email, password } = req.body;

      var user = await pool.query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);
      console.log("length", user.rows.length);
      if (user.rows.length === 0)
        next({ msg: "email doesn't exists", status: 200 });
      const { hash_password } = user.rows[0];
      bcrypt.compare(password, hash_password, function (err, result) {
        //if password doesnt match result is false
        //but err is also false ???
        if (!result) {
          return next({ msg: "incorrect password", status: 200 });
        }
        let data = { email };
        let token = helper.createToken(data);
        res.json({ data, token });
      });
    }
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    req
      .checkBody("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a proper email, eg: example@xyz.abc");

    req
      .checkBody("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters");

    let errors = req.validationErrors();
    console.log(errors);
    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      // const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
      const { email, password } = req.body;

      //show custom msg if email already exist
      const checkEmail = await pool.query(
        "SELECT email FROM users where email=$1",
        [email]
      );
      if (checkEmail.rows.length > 0) {
        next({ msg: "Email already exits", status: 300 });
      } else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
              return next(err);
            }
            const query =
              "INSERT INTO users (email, hash_password) VALUES ($1, $2) RETURNING *";
            const value = [email, hash];
            const todo = await pool.query(query, value);

            res.json({ msg: "registered successful", status: 200 });
            // Store hash in your password DB.
          });
        });
      }
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = { login, register };
