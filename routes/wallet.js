const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

// Env vars
const URL = process.env.API_BASE_URL+'/wallet'
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE


// Init cache
let cache = apicache.middleware

router.get('/inscriptions', cache('15 seconds'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query,
        })
        
        const apiRes = await needle(
            'get',
            `${URL}/inscriptions?${params}`,
            { headers: { [API_KEY_NAME]: API_KEY_VALUE } }
        )

        res.header('Access-Control-Allow-Origin', 'https://www.litoshi.app');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        
        const data = apiRes.body

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/activity', cache('15 seconds'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query,
        })
        
        const apiRes = await needle(
            'get',
            `${URL}/activity?${params}`,
            { headers: { [API_KEY_NAME]: API_KEY_VALUE } }
        )

        res.header('Access-Control-Allow-Origin', 'https://www.litoshi.app');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        
        const data = apiRes.body

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router