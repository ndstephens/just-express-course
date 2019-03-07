const path = require('path')

const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')

// IMPORT ROUTERS
const indexRouter = require('./routes/index')
const movieRouter = require('./routes/movie')
const searchRouter = require('./routes/search')

// INIT APP
const app = express()

// view engine setup
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'))

// MIDDLEWARE
app.use(helmet())
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//* Verify API key middleware
app.use((req, res, next) => {
  if (req.query.api_key !== '123456789') {
    res.status(401).json('Invalid API key')
  } else {
    next()
  }
})

// ROUTERS
app.use('/', indexRouter)
app.use('/movie', movieRouter)
app.use('/search', searchRouter)

//? FOR ERROR HANDLING, if any route above can not send back appropriate data, can just use 'next()' which will pass it down to here, which creates a 404 error out of the response
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
