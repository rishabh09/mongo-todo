const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('../db')
const { createTodo, getAllTodos } = require('../controllers/todos')

const app = express()

app.use(bodyParser.json())

app.post('/todo/create', createTodo)
app.get('/todos/:status', getAllTodos)

module.exports = app
