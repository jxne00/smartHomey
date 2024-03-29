const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const port = 8089;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // for css/script

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartHomey',
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

require('./routes/main')(app, db);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.listen(port, () =>
  console.log(`App is listening on http://localhost:${port}/`)
);
