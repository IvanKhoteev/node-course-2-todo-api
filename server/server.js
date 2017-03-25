global.config = require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id,
  });

  todo.save().then(todo => {
    res.send(todo.toJSON());
  }, err => {
    res.status(400).send(err);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({_creator: req.user._id}).then(todos => {
    res.send({todos: _.map(todos).map(todo => _.pick(todo, ['text', 'completed', 'completedAt', '_id']))});
  }, err => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id,
  }).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(err => {
    res.status(400).send(err);
  });
});

app.delete('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id,
  }).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(err => res.status(400).send(err));
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  const body = _.pick(req.body, ['text', 'completed']);

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id,
  }, {$set: body}, {new: true}).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(err => {
    res.status(400).send(err);
  });
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then(token => {
    res.header('x-auth', token).send(user.toJSON());
  }).catch(err => res.status(400).send(err));
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then(user => {
    return user.generateAuthToken().then(token => {
      res.header('x-auth', token).send(user);
    });
  }).catch(err => res.status(400).send(err));
});

app.delete('/users', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
