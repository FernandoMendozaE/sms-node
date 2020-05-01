const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const app = express();

// settings
app.set('port', process.env.PORT || 3000); // TODO: se encarga de asignar el puerto
app.set('views', path.join(__dirname, 'views')); // TODO: modulo encargado de obtener toda la ruta de views
app.engine(
  '.hbs',
  exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'), // obtiene la direccion de la carpeta view y lo une a la carpeta layouts
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./libs/handlebars'),
  })
); // TODO: motor de plantilla
app.set('view engine', '.hbs'); // TODO: set: configuración

// middlewares
app.use(morgan('dev')); // TODO: instanciando morgan
app.use(express.json()); // TODO: middlewares que permite entender los datos en formato JSON (desde un API REST)
app.use(express.urlencoded({ extended: false })); // TODO: (desde un formulario POST)

// routes
app.use(require('./routes/index.routes')); // TODO: use: utiliza el método routes

// static files
app.use(express.static(path.join(__dirname, 'public'))); // TODO: definir archivos estáticos

module.exports = app;
