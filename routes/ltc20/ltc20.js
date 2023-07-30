const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

// Env vars
const URL = process.env.API_LTC20_BASE_URL+'/brc20'


// Init cache
let cache = apicache.middleware

router.get('/wallet_balances', cache('15 seconds'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            ...url.parse(req.url, true).query,
        })
        
        const apiRes = await needle(
            'get',
            `${URL}/tokens?${params}`
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

router.get('/ticker_info', cache('15 seconds'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            ...url.parse(req.url, true).query,
        })
        
        const apiRes = await needle(
            'get',
            `${URL}/token-summary?${params}`
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