require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments.js');
const authRouter = require('./routes/auth.js');

const app = express();

app.use(cookieParser());
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

app.use(express.static(path.normalize(path.join(__dirname, 'public'))));

require('./data/reddit-db');

// Routes
app.use('/', postRouter);
app.use('/', commentRouter);
app.use('/', authRouter);


const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server Started: http://localhost:${port}`);
  });

module.exports = app;
