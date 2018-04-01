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

module.exports = {
  createTodo
}
