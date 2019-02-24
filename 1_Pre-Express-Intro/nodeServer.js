// import in the native NodeJS HTTP module
const http = require('http')
const fs = require('fs')

// http module has a 'createServer' method that takes 1 argument
// that argument is a callback that takes in the request and response objects
//* the callback will be run whenever this server receives an HTTP Request on port 3000 (in this case)
const server = http.createServer((req, res) => {
  console.log(req.url)
  // 'req.url' is the path relative to the root domain that was requested

  if (req.url === '/') {
    // the user wants the home page
    // res = our way of responding to the requester
    // don't have to write the Start-Line
    res.writeHead(200, { 'content-type': 'text/html' }) // the Header(s)
    const homePageHTML = fs.readFileSync('./node.html')
    res.write(homePageHTML) // the Body
    res.end() // must close the connection (could put the Body here)
    //
  } else if (req.url === '/style.css') {
    res.writeHead(200, { 'content-type': 'text/css' })
    const cssFile = fs.readFileSync('./style.css')
    res.write(cssFile)
    res.end()
    //
  } else if (req.url === '/node.png') {
    res.writeHead(200, { 'content-type': 'image/png' })
    const nodeLogo = fs.readFileSync('./node.png')
    res.write(nodeLogo)
    res.end()
    //
  } else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h3>Sorry, page not found</h3>')
    res.end()
  }
})

// 'createServer' returns an object with a 'listen' method
// 'listen' takes 1 argument, a 'port' to listen for HTTP traffic on
// 'port' has to be greater than 1000
server.listen(3000)
