const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('../db')
const { createTodo } = require('../controllers/todos')


const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())

app.post('/todo/create', createTodo)

app.listen(PORT, () => {
  console.log('server is running on port', PORT)
})
