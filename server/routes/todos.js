const express = require('express');
const todos = express.Router();
const knex = require('../db/knex');

/* GET todos page. */
todos.get('/', (req, res) => {
	knex('todo')
		.select()
		.then(todos=> {
  			res.render('all', { todos: todos });
		})
});

todos.get('/new', (req, res) => {
  res.render('new');	
});

module.exports = todos;
