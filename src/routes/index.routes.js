const { Router } = require('express')
const router = Router()

const { sendMessage } = require('../twilio/send-sms')
const SMS = require('../models/sms')

router.get('/', async (req, res) => {
  const messages = await SMS.find().lean() // TODO: lean: convierte un objeto mongo a javascript
  console.log('typeof', typeof(messages))
  // messages.forEach(m => {
  //   console.log(m.body)
  // })
  res.render('index', { messages }) // TODO: renderizando en express y enviando datos
})

router.post('/send-sms', async (req, res) => {
  // console.log(req.body)
  const { message, phone } = req.body

  if (!message || !phone) return res.json('Missing message or phone.')

  const result = await sendMessage(message, phone)
  console.log(result.sid)

  await SMS.create({ Body: req.body.message, To: req.body.phone })

  res.redirect('/') // TODO: redireccionar en express
})

module.exports = router
