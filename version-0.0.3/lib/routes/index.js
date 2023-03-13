import express from 'express'
import fetch from 'node-fetch'
import cleanData from '../helpers/cleanData.js'

const routeIndex = express.Router()

routeIndex.get('/', function (request, response) {
    const tag = 'ocd'
    const url = `${process.env.BASE_URL}/random?tag=${tag}&api_key=${process.env.KEY}`
    const view = 'index'

    fetch(url)
        .then(response => response.json())
        .then(json => {
            response.render(view, {
                giphy: cleanData(json.data)
            })
        })
        .catch(err => console.error(err));
})


export default routeIndex