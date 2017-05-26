var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/bower_components')));
app.use(bodyParser.json());

require('./server/config/mongoose');
require('./server/config/routes')(app);



app.listen(8000, function(){
	console.log("MAJOR TOM")
})