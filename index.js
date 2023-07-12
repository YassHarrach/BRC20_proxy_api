const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = 5000

const app = express()

// Rate limiting
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 Mins
    max: 1000
})
app.use(limiter)
app.set('trust proxy', 1)

// Routes
app.use('/brc20', require('./routes/brc20.js'))
app.use('/wallet', require('./routes/wallet.js'))

// Enable cors
app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))