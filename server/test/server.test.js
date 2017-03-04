const path = require('path');
const expect = require('expect');
const request = require('supertest');

const app = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const todos = [{
  text: 'First test todo text',
},
{
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
