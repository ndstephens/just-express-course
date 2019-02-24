const express = require('express')

const app = express()

//* anything within the 'public' directory will be available directly on the root URL (localhost:3000/node.png  NOT localhost:3000/public/node.png)
//? makes retrieving CSS and image files very easy, or even static pages
app.use(express.static('public'))

//* can have multiple static directories
// app.use(express.static('another_directory'))
//? HOWEVER, never expose sensitive files with this, only public files

//
//
app.listen(3000, () => console.log('Server listening on port 3000...'))
