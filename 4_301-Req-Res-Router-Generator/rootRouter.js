const express = require('express')

let router = express.Router()

//* 'router.use()' also exists for middleware that is SPECIFIC to this router

router.get('/', (req, res, next) => {
  res.json({
    msg: 'ROOT router works',
  })
})

module.exports = router
