const router = require("express").Router();

//loading middlewares
const authorize = require("./middlewares/authorize");

//loading routes
const todoRoutes = require("./routes/todoRoute");
const authRoutes = require("./routes/authRoute");

router.use("/auth", authRoutes);
router.use("/todo", authorize, todoRoutes);

module.exports = router;
