const express = require('express');
var cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');

// App
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 

// Routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

module.exports = app;