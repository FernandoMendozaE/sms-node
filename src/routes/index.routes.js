const { Router } = require('express')
const router = Router()

const { indexController, postMenssage, reciveMessage } = require('../controllers/index.controller') // TODO: importando funciones de las rutas

// Main Routes
router.get('/', indexController)

// Send an SMS
router.post('/send-sms', postMenssage)

// Receive an SMS
router.post('/sms', reciveMessage)

module.exports = router
