const path = require('path')
const express = require('express')

const app = express()
//* express() IS the 'createApplication()' method in the Express source code
//* calling it calls the 'createApplication()' method that returns an object and it gets assigned to 'app'

// serve static files
app.use(express.static('public'))

//* 'app.all()' will accept ALL HTTP methods (GET, POST, etc)
app.all('/', (req, res) => {
  // Express handles the basic Headers
  // res.send('<h1>Home Page</h1>')
  console.log(path.join(__dirname + '/node.html'))
  res.sendFile(path.join(__dirname + '/node.html'))
  // Express handles ending the req-res cycle
})

//* the 404 page...any path that's not caught by '/' above
//* '*' means any path
app.all('*', (req, res) => {
  res.send('<h1>Sorry, page does not exist</h1>')
})

//* the callback is optional
app.listen(3000, () => console.log('Server is listening on port 3000...'))
