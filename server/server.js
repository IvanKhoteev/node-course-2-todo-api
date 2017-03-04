const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save().then(result => {
    res.send(result);
  }, err => {
    res.status(400).send(err);
  });
});

// app.get('/todos', (req, res) => {
//
// });
//
// app.get('/todos/:id', (req, res) => {
//
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
