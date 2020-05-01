const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { sendMessage } = require('../twilio/send-sms');
const SMS = require('../models/sms');

const { getSocket } = require('../sockets');

/**
 * Método encargado de renderizar
 */
const indexController = async (req, res) => {
  const messages = await SMS.find().sort('-createdAt').lean(); // TODO: lean: convierte un objeto mongo a javascript
  // messages.forEach(m => {
  //   console.log(m.body)
  // })
  res.render('index', { messages }); // TODO: renderizando en express y enviando datos
};

/**
 * Método encargado de enviar el mensaje
 */
const postMenssage = async (req, res) => {
  // console.log(req.body)
  const { message, phone } = req.body;

  if (!message || !phone) return res.json('Missing message or phone.');

  const result = await sendMessage(message, phone);
  console.log(result.sid);

  await SMS.create({ Body: req.body.message, To: req.body.phone });

  res.redirect('/'); // TODO: redireccionar en express
};

const reciveMessage = async (req, res) => {
  // console.log(req.body);
  const savedSMS = await SMS.create({
    Body: req.body.Body,
    From: req.body.From,
  });

  getSocket().emit('new message', savedSMS); // TODO: socket enviar evento

  const twiml = new MessagingResponse();
  twiml.message('This is my response');

  res.send(twiml.toString());
};

module.exports = {
  indexController,
  postMenssage,
  reciveMessage,
};
