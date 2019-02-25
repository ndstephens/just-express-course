const path = require('path')

const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//* To use an Express Rendering Engine:
//? 1. Do your regular Express work
//? 2. Set a view engine (must choose one)
//? 3. Set a views directory, can add more than one in an array (/views by default, set implicitly)
//? 3. Inside a route, add a 'res.render()'
//? 4. Pass to that route the view template file you want to use, AND the data you want to send to that file
//? 5. Express parses the view file
//? 6. It creates an HTML page from the view file and the data

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // setting it explicitly

app.get('/', (req, res, next) => {
  res.render('index')
})

//
app.listen(3000, () => {
  console.log('server running...')
})
