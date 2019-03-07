const express = require('express')

const app = express()

//* Request ---MIDDLEWARE---> Response
//? A Middleware Function is ANY function that has access to the req, res, and next objects...(basically defines what Express is)

const validateUser = (req, res, next) => {
  // ie. get info out of the req object
  // ie. do some stuff with the DB
  //* res.locals can be accessed everywhere, used for passing around info
  res.locals.validated = true
  console.log('Validated Ran!!!')
  next()
}

//? 'validateUser' will run for EVERY request (ALL METHODS AND PATHS)
app.use(validateUser)

//? 'validateUser' will ONLY run for the '/admin' path (ALL METHODS)
// app.use('/admin', validateUser)

//? 'validateUser' will ONLY run for the '/admin' path (ONLY GET METHOD)
// app.get('/admin', validateUser)

//* With 'app.use()'....'use' means ALL METHODS, doesn't specify get, post, etc
//? That's why 'app.use()' will act on EVERY incoming REQUEST unless otherwise specified, and often send the result onto the next piece of middleware

app.get('/', (req, res, next) => {
  res.send('<h1>Main Page</h1>')
  console.log(res.locals.validated)
})

app.get('/admin', (req, res, next) => {
  res.send('<h1>Admin Page</h1>')
  console.log(res.locals.validated)
})

//
//
app.listen(3000)
