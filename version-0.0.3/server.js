import express from 'express'
import routeIndex from './lib/routes/index.js'
import routeGiphies from './lib/routes/giphies.js'
import routeGiphy from './lib/routes/giphy.js'
import dotenv from 'dotenv'

dotenv.config()

const server = express()

server.set('view engine', 'ejs')
server.set('views', 'views')

server.use(express.static('public'))
server.use(routeIndex)
server.use(routeGiphies)
server.use(routeGiphy)

server.listen(process.env.PORT)

/** refactor code  

[v] consistent code flow
[v] implement express.Router()
[v] .env
[v] split code into modules (routes, helpers)
[ ] nested ejs (<%- include('giphy', {id, title}); %>)
[ ] fetch error handling with try / catch 

*/