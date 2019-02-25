const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the GET page</h1>')
})
app.post('/', (req, res) => {
  res.send('<h1>Welcome to the POST page</h1>')
})
app.put('/', (req, res) => {
  res.send('<h1>Welcome to the PUT page</h1>')
})
app.delete('/', (req, res) => {
  res.send('<h1>Welcome to the DELETE page</h1>')
})

//

app.listen(3000, () => console.log('Server listening on port 3000...'))
