'use strict';

const express = require('express');
const Todo = require('./models/todo');
const router = express.Router(); // eslint-disable-line

// get all
router.get('/api/todos', function(req, res) {
  Todo.find({})
    .exec(function(err, todos) {
      res.send(todos);
    });
});

// delete one
router.delete('/api/todos/delete/:id', (req, res) => {
  Todo.deleteOne({ _id: req.params.id }).then(function() {
    console.log('in deletion route');
    res.sendStatus(204);
  }).catch(function() {
    res.redirect('/');
  });
});

// add one
router.post('/api/todos', (req, res) => {
  const newTodo = new Todo();

  newTodo.description = req.body.description;
  newTodo.personResponsible = req.body.personResponsible;
  newTodo.isComplete = false;
  newTodo.dueDate = req.body.dueDate;

  newTodo.save()
    .then(function() {
      res.sendStatus(204);
    });
});

module.exports = router;
