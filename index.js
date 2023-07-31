const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = 5000

const app = express()

// Rate limiting
/*const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 Mins
    max: 1000
})
app.use(limiter)*/
app.set('trust proxy', 1)


// Liste blanche d'origines autorisées (front-end)
const allowedOrigins = ['https://www.litoshi.app'];

// Middleware pour vérifier l'origine de la requête
function checkOrigin(req, res, next) {
  const requestOrigin = req.headers.origin;
  if (allowedOrigins.includes(requestOrigin)) {
    // L'origine est autorisée, passez à l'étape suivante (next())
    next();
  } else {
    // L'origine n'est pas autorisée, renvoyez une réponse d'erreur 403 (Forbidden)
    res.status(403).json({ error: 'Origine non autorisée' });
  }
}
 
// Exemple de middleware d'authentification par clé d'API
const apiLitoshiValue = process.env.API_LITOSHI_VALUE
const apiKeys = [apiLitoshiValue];

function authenticateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"] || req.query.apiKey;

  if (!apiKey || !apiKeys.includes(apiKey)) {
    return res.status(401).json({ error: "Unauthorized - Invalid API key" });
  }

  // La clé d'API est valide, passer à la prochaine étape de traitement
  next();
}

// Middleware d'authentification pour protéger les routes sensibles
//app.use(authenticateApiKey);

// Enable cors
app.use(cors({ origin: checkOrigin }))

// Routes
app.use('/brc20', require('./routes/brc20/brc20.js'))
app.use('/wallet', require('./routes/brc20/wallet.js'))
app.use('/ltc20', require('./routes/ltc20/ltc20.js'))


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))