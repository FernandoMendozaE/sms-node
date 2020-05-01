const socket = io();

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
};
timeago.register('es_ES', locale);

/**
 * Notification
 */
// TODO: Notificaciones
Notification.requestPermission().then(function (result) {
  console.log(result);
});
function notifyMe(message = 'Hi there!') {
  // Comprobamos si el navegador soporta las notificaciones
  if (!('Notification' in window)) {
    alert('Este navegador no soporta las notificaciones del sistema');
  }

  // Comprobamos si ya nos habían dado permiso
  else if (Notification.permission === 'granted') {
    // Si esta correcto lanzamos la notificación
    var notification = new Notification(message);
  }

  // Si no, tendremos que pedir permiso al usuario
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Si el usuario acepta, lanzamos la notificación
      if (permission === 'granted') {
        var notification = new Notification(message);
      }
    });
  }

  // Finalmente, si el usuario te ha denegado el permiso y
  // quieres ser respetuoso no hay necesidad molestar más.
}

socket.on('new message', data => {
  console.log('New SMS');
  // console.log('data', data);

  notifyMe('New SMS received');

  const messagesList = document.getElementById('messages');

  const li = document.createElement('li');
  li.classList =
    'list-group-item list-group-item-warning list-group-item-action';

  const body = document.createElement('p');
  body.appendChild(document.createTextNode(data.Body));

  const _id = document.createElement('p');
  _id.appendChild(document.createTextNode(data._id));

  const from = document.createElement('span');
  data.From = data.From.replace(/[0-9]/g, 'x');
  from.appendChild(document.createTextNode(data.From + ' '));

  const createdAt = document.createElement('span');
  //createdAt.appendChild(document.createTextNode(timeago.format(data.createdAt, 'es_ES'))); // formato español
  createdAt.appendChild(
    document.createTextNode(timeago.format(data.createdAt))
  );

  li.appendChild(body);
  li.appendChild(_id);
  li.appendChild(from);
  li.appendChild(createdAt);

  messagesList.prepend(li);
});
