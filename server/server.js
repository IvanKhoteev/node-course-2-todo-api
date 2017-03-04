let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
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
