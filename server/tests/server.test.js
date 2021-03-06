const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo')

const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
}, {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    comptetedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect((res) => {
            expect(res.body.text).toBe(text)
          })
          .end((err, res) => {
              if(err) {
                  return done(err);
              }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
          });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
          .post('/todos')
          .send({})
          .expect(400)
          .end((err, res) => {
              if(err) {
                return done(err);
              }

              Todo.find().then((todos) => {
                  expect(todos.length).toBe(2);
                  done();
              }).catch((e) => done(e));
            });
    });
});

describe('GET /todos route',() => {
    it('should return all objects from the collection', (done) => {
        request(app)
          .get('/todos')
          .expect(200)
          .expect((res) => {
              expect(res.body.todos.length).toBe(2);
          })
          .end(done)
    })
})

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {

        let hexId = todos[0]._id.toHexString();

        request(app)
          .get(`/todos/${hexId}`)
          .expect(200)
          .expect((res) => {
              expect(res.body.todo.text).toBe(todos[0].text)
          })
          .end(done)
    }),

    it('should return 404 if request was invalid', (done) => {
        request(app)
          .get("/todos/sampleInvalidID")
          .expect(404)
          .expect((res) => {
              expect(res.body).toEqual({})
          })
          .end(done)
    }),

    it('should return 404 if request valid but ID not found', (done) => {
        request(app)
          .get(`/todos/${new ObjectID().toHexString()}`)
          .expect(404)
          .end(done)
    })
})

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = todos[0]._id.toHexString();

        request(app)
          .delete(`/todos/${hexId}`)
          .expect(200)
          .expect((res) => {
              expect(res.body.todo._id).toBe(hexId)
          })
          .end((err, res) => {
              if (err) {
                  return done(err);
              }

              Todo.findById(hexId).then((todo) => {
                  expect(todo).toNotExist;
                  done();
              }).catch((e) => done(e));
              
          });
    }),

    it('should return 404 if todo not found', (done) => {
        request(app)
        .delete("/todos/sampleInvalidID")
        .expect(404)
        .expect((res) => {
            expect(res.body).toEqual({})
        })
        .end(done)
    }),

    it('should return 404 if objectID is invalid', (done) => {
        request(app)
        .delete(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done)
    })
})

describe('PATCH /todos/:id', () => {
    it('should update a todo', (done) => {
        let hexId = todos[0]._id.toHexString();
        let text = "New text for the first todo";

        request(app)
          .patch(`/todos/${hexId}`)
          .send({
              text,
              completed: true,
          })
          .expect(200)
          .expect((res) => {
              expect(res.body.todo.text).toBe(text);
              expect(res.body.todo.completed).toBe(true);
              //toBeA doesn't work from v21 onwards
          })
          .end(done)
    })

    it('should clear completedAt when todo is not completed', (done) => {
        let hexId = todos[1]._id.toHexString();
        let text = "New text for the second todo";

        request(app)
          .patch(`/todos/${hexId}`)
          .send({
              text,
              completed:false
          })
          .expect(200)
          .expect((res) => {
              expect(res.body.todo.text).toBe(text);
              expect(res.body.todo.completed).toBe(false);
              expect(res.body.todo.comptetedAt).toNotExist;

          })
          .end(done)
    })
})