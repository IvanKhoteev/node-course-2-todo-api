const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const userId = '58bad36872bae7c33dd205f4';

User.findById(userId).then(user => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User:', user);
}, err => console.log(err.message)
);

// const id = '58bab07f915cc8c8d42bcad511';
//
// if (!ObjectID.isValid(id)) {
//   console.log('Invalid ObjectID');
// }

// Todo.find({_id: id}).then(todos => console.log('Todos:', todos));
//
// Todo.findOne({_id: id}).then(todo => console.log('Todo:', todo));

// Todo.findById(id).then(todo => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by ID:', todo);
// }).catch(err => {
//   console.log(err.message);
// });
