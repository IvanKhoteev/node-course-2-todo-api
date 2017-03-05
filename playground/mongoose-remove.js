const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then(result => console.log(result));

// Todo.findOneAndRemove('some id').then(result => console.log(result));

Todo.findByIdAndRemove('58bc395772bae7c33dd20c32')
  .then(todo => console.log(todo),
        err => console.log('Unable to delete todo. Error:', err.message));
