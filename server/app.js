const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const debug = require('debug')('methods-log')

const passport = require('./config/passport')

const routesAuth = require('./routes/auth')
const routesPrivate = require('./routes/private')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  const { method, path, body } = req
  debug({ method, path, body })
  next()
})

app.use(cors())

app.use(passport.initialize())

app.use(routesAuth)
app.use(routesPrivate)

module.exports = app
