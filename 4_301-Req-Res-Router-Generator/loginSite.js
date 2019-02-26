const path = require('path')

const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const app = express()

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//? CUSTOM MIDDLEWARE
app.use((req, res, next) => {
  if (req.query.msg === 'fail') {
    //* res.locals is available to all middleware and the view engine (useful to pass around info)
    res.locals.msg = `Sorry. This username and password combo does not exist`
  } else {
    res.locals.msg = ''
  }
  next()
})

app.get('/', (req, res, next) => {
  res.send('test test')
})

app.get('/login', (req, res, next) => {
  //* req.query is an object with props from the query string
  //* only put INSECURE data in the query string
  // console.log(req.query)
  //? instead of accessing req.query.msg here specifically, we used middleware above so that it was handled on ALL request.  not necessary, just a design choice
  res.render('login')
  // res.render('login', {
  //   msg: req.query.msg,
  // })
})

app.post('/process_login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  // pretend to check the db to verify username and password
  // if valid: save username in cookies, then send onto Welcome page
  if (password === 'x') {
    //* res.cookie takes 2 args: name of cookie, value to set it to
    res.cookie('username', username)
    //* res.redirect takes 1 arg: where to send the browser
    res.redirect('/welcome')
  } else {
    //* '?' is a special character in the URL, everything after it is NOT part of the path, it's the query string
    res.redirect('/login?msg=fail&test=hello')
  }
})

app.get('/welcome', (req, res, next) => {
  res.render('welcome', {
    username: req.cookies.username,
  })
  //* 'req.cookies' object will have a prop for every named cookie that has been set (requires 'cookie-parser' middleware)
})

//? ':storyId' is a WildCard
app.get('/story/:storyId', (req, res, next) => {
  //* req.params object has a prop for each wildcard
  res.send(`<h1>Story ${req.params.storyId}</h1>`)
})

app.get('/statement', (req, res, next) => {
  // res.sendFile(path.join(__dirname, 'userStatements/bank-statement.png'))
  res.download(
    path.join(__dirname, 'userStatements/bank-statement.png'),
    'Your-statement.png', // custom filename (optional)
    err => console.log(err), // callback after file is sent
  )
})

app.get('/logout', (req, res, next) => {
  //* res.clearCookie takes 1 arg: the cookie to clear (by name)
  res.clearCookie('username')
  res.redirect('/login')
})

//
app.listen(3000)
