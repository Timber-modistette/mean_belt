var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/mean_wall4722');
mongoose.Promise = global.Promise;

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') != -1){
		console.log('loading ' + file + '...');
		require(models_path + '/' + file);
	}
});