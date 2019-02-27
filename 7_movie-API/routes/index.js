var express = require('express')
var router = express.Router()

const movies = require('../data/movies')

//* HOME API -- '/'

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' })
// })

//* When the client from project 6 make a GET request to their index '/', that server (on localhost:3000) makes an Axios GET request to this server (localhost:3030) at this route '/most_popular' to fetch data.  The client doesn't see '/most_popular' in their URL, they just see '/'

router.get('/most_popular', (req, res, next) => {
  const page = req.query.page || 1

  if (req.query.api_key !== '123456789') {
    res.json('Invalid API key')
  } else {
    const mostPopularMovies = movies.filter(movie => movie.most_popular)
    //? return only 20 at a time, based on page number
    const results = mostPopularMovies.slice((page - 1) * 20, page * 20)
    res.json({ results })
    //? send 'results' array in an object b/c that's how the calling UI function expects it (we're mirroring how the MovieDB API returns the data)
  }
})

module.exports = router
