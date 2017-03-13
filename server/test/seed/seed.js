const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo text',
  completed: true,
  completedAt: Date.now(),
},
{
  _id: new ObjectID(),
  text: 'Second test todo text',
  completed: false,
  completedAt: null,
},
{
  _id: new ObjectID(),
  text: 'Third test todo text',
  completed: true,
  completedAt: Date.now(),
}];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'ivan1@example.com',
  password: 'password1',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId.toHexString(), access: 'auth'}, 'salt').toString(),
  }],
}, {
  _id: userTwoId,
  email: 'ivan2@example.com',
  password: 'password2',
}];

const populateTodos = done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = done => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers,
};
