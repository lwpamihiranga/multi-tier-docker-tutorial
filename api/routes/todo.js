const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// get todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
});

// add todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    todo: req.body.todo,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete todo
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.remove({ _id: req.params.id });

    res.json(deletedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
