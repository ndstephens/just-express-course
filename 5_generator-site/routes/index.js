var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  const date = new Date(1969, 6, 20)
  //* use 'res.set' to SET HEADERS, 'res.get' to GET HEADERS
  // res.set('Cache-Control', 'no-store')
  // res.set('Content-Type', 'text/html')
  res.set('Date', date)

  res.render('index', { title: 'Express' })
})

module.exports = router
