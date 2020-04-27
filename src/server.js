const express = require('express')
const exphbs = require('express-handlebars');
const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

module.exports = app
