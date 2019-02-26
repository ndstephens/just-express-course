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

app.get('/', (req, res, next) => {
  res.send('test test')
})

app.get('/login', (req, res, next) => {
  res.render('login')
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
    res.redirect('/login?msg=fail')
  }
})

app.get('/welcome', (req, res, next) => {
  res.render('welcome', {
    username: req.cookies.username,
  })
  //* 'req.cookies' object will have a prop for every named cookie that has been set (requires 'cookie-parser' middleware)
})

app.get('/logout', (req, res, next) => {
  //* res.clearCookie takes 1 arg: the cookie to clear (by name)
  res.clearCookie('username')
  res.redirect('/login')
})

//
app.listen(3000)
