import express from 'express'
import fetch from 'node-fetch'
import cleanData from '../helpers/cleanData.js'

const routeGiphy = express.Router()

routeGiphy.get('/giphy/:id', function (request, response) {
    const url = `${process.env.BASE_URL}/${request.params.id}?api_key=${process.env.KEY}`
    const view = 'giphy'

    fetch(url)
        .then(response => response.json())
        .then( json => {
            response.render(view, {
                giphy: cleanData(json.data),
            })
        })
})

export default routeGiphy