const config = require('../config');
const client = require('twilio')(config.accountSind, config.authToken);

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
      body,
    });
    console.log(message);
    return message;
  } catch (error) {
    console.log(error);
  }
} // TODO: método encargado de enviar el mensaje twilio

module.exports = { sendMessage };
