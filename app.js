const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const swaggerDoc = require('./swaggerDoc');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(swaggerDoc);
app.get('/', function(req, res){
	res.send('Hello World');
});

app.use('/api', require('./api/router'))

module.exports = app;

