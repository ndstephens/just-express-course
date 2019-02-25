const path = require('path')

const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res, next) => {
  res.send('test test')
})

//
app.listen(3000)
