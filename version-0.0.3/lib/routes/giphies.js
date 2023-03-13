import express from 'express'
import fetch from 'node-fetch'
import cleanData from '../helpers/cleanData.js'

const routeGiphies = express.Router()

routeGiphies.get('/giphies', function (request, response) {
    const topic = 'kitten'
    const limit = 20
    const url = `${process.env.BASE_URL}/search?q=${topic}&limit=${limit}&api_key=${process.env.KEY}`
    const view = 'giphies'

    fetch(url)
        .then(response => response.json())
        .then(json => {
            response.render(view, {
                heading:`${topic} giphies`,
                giphies: cleanData(json.data)
            })
        })
        .catch(err => console.error(err));
})

export default routeGiphies