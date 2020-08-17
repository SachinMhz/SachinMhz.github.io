const router = require("express").Router();

const controller = require("../controllers/authController");

router.route("/login").get(controller.login).post(controller.login);

router.route("/register").post(controller.register);

module.exports = router;
