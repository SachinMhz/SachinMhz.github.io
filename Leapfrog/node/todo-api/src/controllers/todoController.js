const pool = require("../db");
const logger = require("../utils/logger");

//get all todo
const getAll = async (req, res, next) => {
  console.log(req.user);
  try {
    const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
    res.json(todo.rows);
  } catch (err) {
    next(err);
    console.log(err);
    logger.error(err);
  }
};

//get a todo - remaining
// -- /todo/remaining
const getRemaining = async (req, res, next) => {
  try {
    const remaining = await pool.query(
      "SELECT * FROM todo WHERE is_complete = $1 ORDER BY id ASC",
      [false]
    );
    res.json(remaining.rows);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//get a todo - completed
// --- /todo/completed
const getCompleted = async (req, res, next) => {
  try {
    const remaining = await pool.query(
      "SELECT * FROM todo WHERE is_complete = $1 ORDER BY id ASC",
      [true]
    );
    console.log(remaining.rows);
    res.json(remaining.rows);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//create new todo
const postTodo = async (req, res, next) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description,is_complete) VALUES ($1, $2) RETURNING *",
      [description, false]
    );
    const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
    res.json(todo.rows);
    // res.json(newTodo.rows[0]);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//update todo
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    description
      ? await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [
          description,
          id,
        ])
      : await pool.query(
          "UPDATE todo SET is_complete = NOT is_complete WHERE id = $1",
          [id]
        );
    // res.json(newTodo.rows[0]);

    const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
    res.json(todo.rows);
    // res.json("complete status was toggle");
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//delete todo
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteQuery = await pool.query("DELETE FROM todo WHERE id = $1", [
      id,
    ]);
    // res.json(newTodo.rows[0]);

    const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
    res.json(todo.rows);
    // res.json("todo was deleted");
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

module.exports = {
  getAll,
  getRemaining,
  getCompleted,
  postTodo,
  updateTodo,
  deleteTodo,
};
