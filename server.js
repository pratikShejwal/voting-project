const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/',(req, res) => {
  res.send('Hello World')
})
app.listen(PORT)
