const express = require('express')
const db = require('./db')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/',(req, res) => {
  res.send('Hello World')
})

const candidateRoute = require('./routes/candidateRoute')
const userRoute = require('./routes/userRoute')
app.use('/user',userRoute)
app.use('/candidate',candidateRoute)
app.listen(PORT)