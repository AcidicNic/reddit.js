require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const indexRouter = require('./routes/index');

const app = express();

app.engine('hbs', hbs({
  extname: '.hbs',
  layoutDir: __dirname + '/views',
  partialsDir: __dirname + '/views/partials',
  defaultLayout: 'base',
}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server Started: http://localhost:${process.env.PORT || 80}`);
  });

module.exports = app;
