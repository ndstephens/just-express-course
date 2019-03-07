var express = require('express')
var router = express.Router()

const movies = require('../data/movies')
const movieDetails = require('../data/movieDetails')

const requireJSON = (req, res, next) => {
  if (!req.is('application/json')) {
    res.json({ msg: 'Content type must be JSON' })
  } else {
    next()
  }
}

//* MOVIE API -- '/movie'

//? GET top-rated movie
router.get('/top_rated', (req, res, next) => {
  const moviesSorted = movies.sort((a, b) => b.vote_average - a.vote_average)
  res.json(moviesSorted[0])
})

//? GET movie by ID
//* must come last of all '/<something>' routes or else ':movieId' will pick up other url routes as wildcards (:movieID will equal 'top_rated')
router.get('/:movieId', function(req, res, next) {
  const movieId = +req.params.movieId
  const movie = movieDetails.find(movie => movie.id === movieId)
  if (movie) {
    res.json(movie)
  }
  // res.sendStatus(404)
  next()
})

//? POST rating by movie ID
router.post('/:movieId/rating', requireJSON, (req, res, next) => {
  const movieId = req.params.movieId
  const userRating = req.body.value
  if (userRating < 0.5 || userRating > 10) {
    res.json({ msg: 'Rating must be between 0.5 and 10' })
  } else {
    res.json({ msg: 'Thank you for submitting your rating', status_code: 200 })
  }
})

//? DELETE rating by movie ID
router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
  res.json({ msg: 'Rating deleted' })
})

module.exports = router
