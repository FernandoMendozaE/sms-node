require('dotenv').config() // TODO: importa e inicia las variables de entorno
const app = require('./server')

require('./database')

app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`)
})
