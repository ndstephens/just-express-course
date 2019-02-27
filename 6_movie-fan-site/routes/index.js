require('dotenv').config()
const axios = require('axios')
const express = require('express')

const router = express.Router()

//? FOR USE WITH OUR API
const apiKey = '123456789'
const apiBaseUrl = 'http://localhost:3030'
const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`
//? FOR USE WITH THE-MOVIE-DB API
// const apiKey = process.env.MOVIEDB_API_KEY
// const apiBaseUrl = 'http://api.themoviedb.org/3'
// const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300'

router.use((req, res, next) => {
  //* 'imageBaseUrl' is now available in all response objects on the 'locals' object AND therefore also within all templating engines as a property
  res.locals.imageBaseUrl = imageBaseUrl
  next()
  //? DON'T FORGET 'next()'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  axios
    .get(nowPlayingUrl)
    .then(response => {
      // res.json(response.data)
      res.render('index', {
        parsedData: response.data.results,
      })
    })
    .catch(err => console.log(err))
})

router.get('/movie/:id', (req, res, next) => {
  const movieUrl = `${apiBaseUrl}/movie/${req.params.id}?api_key=${apiKey}`
  axios
    .get(movieUrl)
    .then(response => {
      res.render('single-movie', {
        parsedData: response.data,
      })
    })
    .catch(err => console.log(err))
})

router.post('/search', (req, res, next) => {
  const cat = req.body.cat
  const searchTerm = encodeURI(req.body.movieSearch)
  const searchUrl = `${apiBaseUrl}/search/${cat}/?query=${searchTerm}&api_key=${apiKey}`

  axios
    .get(searchUrl)
    .then(response => {
      res.render('index', {
        parsedData:
          cat === 'movie'
            ? response.data.results
            : response.data.results[0].known_for,
      })
    })
    .catch(err => console.log(err))
})

module.exports = router
