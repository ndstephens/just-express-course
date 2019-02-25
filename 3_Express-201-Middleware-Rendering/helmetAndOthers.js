const express = require('express')
const helmet = require('helmet')

const app = express()

//* HELMET is VERY common middleware for good header security
//? PUT IT NEAR THE TOP OF THE APP
app.use(helmet())

//* THE 3 MOST COMMON PIECES OF MIDDLEWARE:
app.use(express.static('public'))
app.use(express.json())
//?  for 'content-type: application/json' (axios, etc)
app.use(express.urlencoded({ extended: false }))
//? for 'content-type: application/x-www-form-urlencoded' (jQuery, forms, etc)

app.post('/server', (req, res) => {
  console.log('HEADERS:', req.headers)
  //* the middleware above is what provides 'req.body'
  console.log('BODY:', req.body)

  res.json('Test')
})

//

app.listen(3000)
