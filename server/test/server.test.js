const path = require('path');
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const app = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo text',
},
{
  _id: new ObjectID(),
  text: 'Second test todo text',
}];

beforeEach(done => {
  Todo.remove({})
    .then(() => Todo.insertMany(todos))
    .then(() => done());
});

describe('POST /todos', () => {
  it('should create a new toto', done => {
    const text = 'Test string';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then(todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(err => done(err));
      });
  });

  it('not should to create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({text: ''})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then(todos => {
          expect(todos.length).toBe(2);
          done();
        }).catch(err => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('should get all  todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toEqual(todos.length);
      })
      .end(done());
  });
});

describe('GET /todos/:id', () => {
  it('should return error if invalid ObjectID passed', done => {
    request(app)
      .get('todos/123')
      .expect(404)
      .expect(res => {
        expect(res.body).toBe(null);
      })
      .end(done());
  });

  it('should return 404 status if document not found', done => {
    request(app)
      .get(`todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .expect(res => {
        expect(res.body).toBe(null);
      })
      .end(done());
  });

  it('should return document if passed valid ObjectId and document exists', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done());
  });
});
