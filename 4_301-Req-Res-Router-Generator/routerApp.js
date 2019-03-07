const express = require('express')
const helmet = require('helmet')

const rootRouter = require('./rootRouter')
const userRouter = require('./userRouter')

const app = express()

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

app.use('/', rootRouter)
app.use('/user', userRouter)

//
app.listen(3000)
