const request = require('supertest')

const app = require('./server')
const Todo = require('../models/todo')

describe('POST /create/todo', () => {
  beforeEach(done => {
    Todo.remove({}).then(() => done())
  })
  afterEach(done => {
    Todo.remove({}).then(() => done())
  })

  it('should give error on sending invalid request', done => {
    const errorMsg = { requestStatus: 0, message: 'Error in creating todo' }
    request(app)
      .post('/todo/create')
      .send({})
      .expect(400)
      .expect(res => {
        expect(res.body).toEqual(errorMsg)
      })
      .end(done)
  })

  it('should give success on sending valid request', done => {
    const successMsg = { message: 'New Todo Created', requestStatus: 1}
    request(app)
      .post('/todo/create')
      .send({ name: 'test todo' })
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(successMsg)
      })
      .end(done)
  })
})

describe('GET /todos/:status', () => {
  const testDb = [
    { name: 'test todo' },
    { name: 'test todo 1' },
    { name: 'test todo 1', completed: true }
  ]
  beforeEach(done => {
    Todo.insertMany(testDb).then(() => done())
  })

  afterEach(done => {
    Todo.remove({}).then(() => done())
  })

  it('should return list of all todos', done => {
    request(app)
      .get('/todos/all')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(3)
      })
      .end(done)
  })

  it('should return list of all completed todos', done => {
    request(app)
      .get('/todos/completed')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(1)
      })
      .end(done)
  })

  it('should return list of all incomplete todos', done => {
    request(app)
      .get('/todos/incomplete')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})
