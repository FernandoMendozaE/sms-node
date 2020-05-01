const timeago = require('timeago.js');

/**
 *  Timeago
 */
var locale = function (number, index, totalSec) {
  // number: the time ago / time in number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ['justo ahora', 'right now'],
    ['hace %s segundos', 'in %s seconds'],
    ['hace un 1 minuto', 'in 1 minute'],
    ['hace %s minutos', 'in %s minutes'],
    ['hace 1 hora', 'in 1 hour'],
    ['hace %s horas', 'in %s hours'],
    ['hace 1 día', 'in 1 day'],
    ['hace %s días', 'in %s days'],
    ['hace 1 semana', 'in 1 week'],
    ['hace %s semanas', 'in %s weeks'],
    ['hace 1 mes', 'in 1 month'],
    ['hace %s unos meses', 'in %s months'],
    ['hace 1 un año', 'in 1 year'],
    ['hace %s años', 'in %s years'],
  ][index];
}; // TODO: dar formato es_ES timeago
timeago.register('es_ES', locale);

module.exports = {
  hideNumber: (phoneNumber = '') => {
    return phoneNumber.replace(/[0-9]/g, 'x'); // TODO: ejemplo expresiones regulares
  },

  timeago: date => {
    // return timeago.format(date, 'es_ES'); // formato español
    return timeago.format(date);
  },
};
