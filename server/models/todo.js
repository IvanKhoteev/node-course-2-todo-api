const mongoose = require('mongoose');
const _ = require('lodash');

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    reqired: true,
    minlength: 1,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null,
  },
  _creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
});

TodoSchema.methods.toJSON = function () {
  const todo = this;
  const todoObject = todo.toObject();
  return _.pick(todoObject, ['text', 'completed', 'completedAt', '_id']);
};

const Todo = mongoose.model('Todo', TodoSchema);

module.exports.Todo = Todo;
