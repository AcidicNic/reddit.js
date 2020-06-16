require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const postRouter = require('./routes/posts');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.engine('hbs', hbs({
  extname: '.hbs',
  layoutDir: __dirname + '/views',
  partialsDir: __dirname + '/views/partials',
  defaultLayout: 'base',
}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

require('./data/reddit-db');

// Routes
app.use('/', postRouter);

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server Started: http://localhost:${port}`);
  });

module.exports = app;
