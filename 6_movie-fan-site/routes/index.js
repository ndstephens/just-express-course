require('dotenv').config()
const axios = require('axios')
const express = require('express')

const router = express.Router()

const apiKey = process.env.MOVIEDB_API_KEY
const apiBaseUrl = 'http://api.themoviedb.org/3'
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`
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
    .catch(err => console.log('Error', err))
})

router.get('/movie/:id', (req, res, next) => {
  axios
    .get(`${apiBaseUrl}/movie/${req.params.id}?api_key=${apiKey}`)
    .then(response => {
      res.redirect(response.data.homepage)
    })
    .catch(err => console.log(err))
})

module.exports = router
