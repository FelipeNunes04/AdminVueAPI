var http = require('http'); 
const express = require('express') 
const app = express() 
var cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 

app.get('/', (req, res, next) => {
    res.json({message: "Ok"});
})

app.get('/items', (req, res, next) => { 
    console.log("Return items!");
    res.json([{id: 1, nome: 'Car'}]);
}) 

var server = http.createServer(app); 
server.listen(3000);
console.log("Listening 3000")
