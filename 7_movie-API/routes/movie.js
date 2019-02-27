var express = require('express')
var router = express.Router()

const movieDetails = require('../data/movieDetails')

//* MOVIE API -- '/movie'

router.get('/:movieId', function(req, res, next) {
  const movieId = +req.params.movieId
  const movie = movieDetails.find(movie => movie.id === movieId)
  if (movie) {
    res.json(movie)
  }
  res.sendStatus(404)
})

module.exports = router
