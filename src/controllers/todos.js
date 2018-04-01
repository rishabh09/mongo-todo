const Todo = require('../models/todo')

const createTodo = (req, res) => {
  const newTodo = new Todo(req.body)
  newTodo.save().then(result => {
    res.status(200).send({
      requestStatus: 1,
      message: 'New Todo Created'
    })
  }).catch(err => {
    res.status(400).send({
      requestStatus: 0,
      message: 'Error in creating todo'
    })
  })
}

const getAllTodos = (req, res) => {
  let query = {}
  const { status } = req.params
  if (status === 'completed') query = { completed: true }
  if (status === 'incomplete') query = { completed: false }

  Todo.find(query).then(result => {
    res.status(200).send({
      requestStatus: 1,
      todos: result
    })
  }).catch(err => {
    res.status(400).send({
      requestStatus: 0,
      message: 'Error in fetching todos'
    })
  })
}

module.exports = {
  createTodo, getAllTodos
}
