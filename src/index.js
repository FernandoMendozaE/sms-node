require('dotenv').config(); // TODO: importa e inicia las variables de entorno
const app = require('./server');

// Implementando sockets
const http = require('http');
const server = http.createServer(app);
require('./sockets').connection(server);

// Database
require('./database');

server.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`);
});
