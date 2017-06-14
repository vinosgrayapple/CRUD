
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      const todos = [
        {
         title: 'Buaild a CRUD App',
         priority: 4,
         date: new Date()
       }, {
         title: 'Do the dishes',
         priority: 3,
         date: new Date()
       }, {
         title: 'I go to sleep',
         priority: 1,
         date: new Date()
       }, {
         title: 'Wife sleeps',
         priority: 10,
         date: new Date()
       },
        
      ];
      return knex('todo').insert(todos);
    });
};
