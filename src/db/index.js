const mongoose = require('mongoose')

let mongouri = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'

if (process.env.NODE_ENV === 'test') {
  mongouri = 'mongodb://localhost:27017/TestTodoApp'
}

mongoose.connect(mongouri)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected to mongodb', mongouri)
})

module.exports = {
  mongoose
}
