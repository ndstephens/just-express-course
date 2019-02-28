var express = require('express')
var router = express.Router()

const movies = require('../data/movies')
const people = require('../data/people')

//? custom middleware to check that 'query' is included in URL
const queryRequired = (req, res, next) => {
  if (!req.query.query) {
    res.json({ msg: 'Query is required' })
  } else {
    next()
  }
}

//? apply middleware to all routes within this router
router.use(queryRequired)

//* SEARCH API -- '/search'

router.get('/movie', function(req, res, next) {
  const searchTerm = req.query.query
  const results = movies.filter(
    movie =>
      movie.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  res.json({ results })
})

router.get('/person', function(req, res, next) {
  const searchTerm = req.query.query
  const results = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  res.json({ results })
})

module.exports = router
