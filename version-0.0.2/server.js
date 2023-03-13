import express from 'express'
import fetch from 'node-fetch'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

// initialise server
const server = express()
//set port
const port = 3002
// set routes 
const routeIndex = express.Router()
const routeGiphies = express.Router()
const routeGiphy = express.Router()

const baseUrl ='https://api.giphy.com/v1/gifs'
const topic = 'refactor'

// activate dotenv
dotenv.config()

// set view enigine
server.set('view engine', 'ejs')
server.set('views', 'views')

// set static folder for client side stuff
server.use(express.static('public'))

// index route
routeIndex.get('/', function (request, response) {
    fetch(baseUrl +'/random?tag='+ topic +'&api_key='+ process.env.apiKey)
        .then(response => response.json())
        .then(data => {
            response.render('index', {
                giphy: data.data
            })
        })
        .catch(err => console.error(err));
})

// overview route
routeGiphies.get('/giphies', function (request, response) {
    const limit = 20

    fetch(baseUrl+'/search?q='+ topic +'&api_key='+ process.env.apiKey +'&limit='+ limit)
        .then(response => response.json())
        .then(data => {
            response.render('giphies', {
                title:`Refactor giphies`,
                giphies: data.data
            })
        })
        .catch(err => console.error(err));
})

// detail route
routeGiphy.get('/giphy/:id', function (request, response) {
    fetch('https://api.giphy.com/v1/gifs/' + request.params.id + '?api_key=jhcL7QPGb2ObrOHw1dEJuL9w2j71zfEk&limit=10')
        .then(response => response.json())
        .then( data => {
            response.render('giphy', {
                giphy: data.data
            })
        })
        .catch(err => console.error(err))
})

// use routes
server.use(routeIndex)
server.use(routeGiphies)
server.use(routeGiphy)

// startup server
server.listen(port)


/** refactor code  

setup:
[ ] nodemon

refactor:
[v] consistent code flow
[v] implement express.Router()
[v] .env file (.gitignore)
[ ] split code into modules

*/