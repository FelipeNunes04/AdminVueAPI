const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');

// App
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 

// Routes
const indexRoutes = require('./routes/index-routes');
app.use('/api/', indexRoutes);

module.exports = app;