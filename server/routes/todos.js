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

todos.get('/:id', (req, res) => {
	const id = req.params.id;
	respondAndRenderTodo(id, res, 'single');
});



todos.get('/:id/edit', (req, res) => {
 const id = req.params.id;
 respondAndRenderTodo(id, res, 'edit');
});


todos.post('/', (req, res) => {
	// console.log(req.body);
	if (validTodo(req.body)) {
		console.log(typeof parseInt(req.body.priority));
		//insert into the database
	const todo = {
		title: req.body.title,
		description: req.body.description,
		priority:parseInt(req.body.priority),
		date: new Date()
	};
	knex('todo')
		.insert(todo, 'id')
		.then(ids => {
			const id = ids[0];
			res.redirect(`/todo/${id}`);
		});

	} else {
		// return an error
		res.status(500);
		res.render('error', {
			message: "Invalid Todo"
		});
	}
});

todos.put('/:id', (req, res) => {
	const id = req.params.id;
	respondAndRenderTodo(id, res, 'single');
});

function validTodo(todo) {
  return typeof todo.title == 'string' &&
          todo.title.trim() != '' &&
          typeof todo.priority != 'undefined' &&
          !isNaN(todo.priority);
}

function validId(id) {
  return !isNaN(id);
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('todo')
      .select()
      .where('id', id)
      .first()
      .then(todo => {
        res.render(viewName, todo);
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
}

module.exports = todos;
