const express = require('express')

const app = express()

app.all('*', (req, res) => {
  // Express handles the basic Headers
  res.send('<h1>Home Page</h1>')
  // Express handles ending the req-res cycle
})

app.listen(3000, () => console.log('Server is listening on port 3000...'))
