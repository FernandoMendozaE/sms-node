const config = require('../config')
const client = require('twilio')(config.accountSind, config.authToken)
// const client = require('twilio')('AC8c404d2765c7ec8b27a18c7ac7cd6536', 'dc73ad4953c32c754123cd378a5a13f9')

/**
 * Send an SMS message
 * @param {string} body - The sms message
 * @param {string} phone - The phone number
 */

async function sendMessage(body, phone) {
  try {
    const message = await client.messages.create({
      to: '+591' + phone,
      from: '+14795515241',
      body
    })
    // console.log(message.sid)
    return message
  } catch (error) {
    console.log(error)
  }
} // TODO: método encargado de enviar el mensaje twilio

module.exports = { sendMessage }
