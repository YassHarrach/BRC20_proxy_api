const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

// Env vars
const URL = process.env.API_BASE_URL+'/brc20'
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE


// Init cache
let cache = apicache.middleware

router.get('/wallet_balances', cache('2 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query,
        })
        console.log(params)
        
        const apiRes = await needle('get', `${URL}/wallet_balances?${params}`)
        const data = apiRes.body

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router