const path = require('path')

const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // setting it explicitly

//? fake middleware to show that 'res.locals' object is accessible by the rendering engine
const validateUser = (req, res, next) => {
  res.locals.validated = true
  next()
}
app.use(validateUser)

app.get('/', (req, res, next) => {
  //* the data in the second arg (in the object) is appended to 'res.locals' object
  res.render('index', {
    msg: 'Success!',
    html: `<p>Passed in HTML</p>`,
  })
})

//
app.listen(3000, () => {
  console.log('server running...')
})
