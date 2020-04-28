const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()

// settings
app.set('port', process.env.PORT || 3000) // TODO: se encarga de asignar el puerto
app.set('views', path.join(__dirname, 'views')) // TODO: modumo encargado de obtener toda la ruta de views
app.engine('.hbs', exphbs({
  layoutsDir: path.join(app.get('views'), 'layouts'), // obtiene la direccion de la carpeta view y lo une a la carpeta layouts
  partialsDir: path.join(app.get('views'), 'partials'),
  defaultLayout: 'main',
  extname: '.hbs'
})) // TODO: motor de plantilla
app.set('view engine', '.hbs') // TODO: set: configuración
// middlewares

// routes
app.use(require('./routes/index.routes')); // TODO: use: utiliza el método routes

// static files
module.exports = app
