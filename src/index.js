const app = require('./server');

require('./database');

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});