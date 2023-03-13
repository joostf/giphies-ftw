import express from 'express'
import fetch from 'node-fetch'

// initialise server
const server = express()

// set view enigine
server.set('view engine', 'ejs')
server.set('views', 'views')

// set static folder for client side stuff
server.use(express.static('public'))

// home route
server.get('/', function (request, response) {
    fetch('https://api.giphy.com/v1/gifs/random?tag=spaghetti&api_key=jhcL7QPGb2ObrOHw1dEJuL9w2j71zfEk&limit=10')
        .then(response => response.json())
        .then(data => {
            response.render('index', {
                giphy: data.data
            })
        })
        .catch(err => console.error(err));
})

// overview route
server.get('/giphies', function (request, response) {
    fetch('https://api.giphy.com/v1/gifs/search?q=spaghetti&api_key=jhcL7QPGb2ObrOHw1dEJuL9w2j71zfEk&limit=10')
        .then(response => response.json())
        .then(data => {
            response.render('giphies', {
                title:`Robot giphies`,
                giphies: data.data
            })
        })
        .catch(err => console.error(err));
})

//set port
const port = 3001

// detail route
server.get('/giphy/:id', function (request, response) {
    fetch('https://api.giphy.com/v1/gifs/' + request.params.id + '?api_key=jhcL7QPGb2ObrOHw1dEJuL9w2j71zfEk&limit=10')
        .then(response => response.json())
        .then( data => {
            response.render('giphy', {
                giphy: data.data
            })
        })
        .catch(err => console.error(err))
})

// favorites route
server.get('/favorites/', function (request, response) {
    response.send('Favorieten')
})

// search route
server.get('/search', function (request, response) {
    response.send('Zoeken')
})

// startup server
server.listen(port)


/** refactor code  

[ ] implement express.Router()
[ ] save stuff in variables
[ ] .env file (.gitignore)
[ ] split code into modules

*/