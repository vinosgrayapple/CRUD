var express = require('express');
var todos = express.Router();
const knex = require('../db/knex');

/* GET todos page. */
todos.get('/', function(req, res, next) {
	knex('todo')
		.select()
		.then(todos=> {
  			res.render('all', { todos: todos });
		})
});

module.exports = todos;
