const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const app = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

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

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
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
          expect(todos.length).toBe(3);
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
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return error if invalid ObjectID passed', done => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });

  it('should return 404 status if document not found', done => {
    const hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return document if passed valid ObjectId and document exists', done => {
    const hexId = todos[0]._id.toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should return 404 if Object id is invald', done => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });

  it('should return 404 if document not found', done => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return removed document id document exists', done => {
    const hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then(todo => {
          expect(todo).toNotExist();
          done();
        }).catch(err => done(err));
      });
  });
});
describe('PATCH /todos/:id', () => {
  it('should return 404 if id is invalid', done => {
    request(app)
      .patch('/todos/123')
      .expect(404)
      .end(done);
  });

  it('should return 404 if document not found', done => {
    request(app)
      .patch(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return updated object if all correct (completed: true)', done => {
    const hexId = todos[1]._id.toHexString();
    const newText = 'Some new test text';
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: newText,
        completed: true,
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toNotBe(null).toBeA('number');
      })
      .end(done);
  });

  it('should return updated object if all correct (completed: false)', done => {
    const hexId = todos[0]._id.toHexString();
    const newText = 'Some new test text';
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: newText,
        completed: false,
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done);
  });

  it('should return updated object if all correct (completed not pass)', done => {
    const hexId = todos[2]._id.toHexString();
    const newText = 'Some new test text';
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: newText,
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done);
  });
});
