let bodyParser = require('body-parser');
let mongo = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let express = require('express');
let app = express();
let route = require('./app/routes/index.js');

let port = process.env.PORT || 3000;
let mongoURL = process.env.MONGO_URI || 'mongodb://localhost:27017/polls'

mongo.connect(mongoURL, function(err,db){

	if(err)
		throw new Error(err);

	console.log(`Successfully connected to database...`);

	app.set('port', port);
	app.set('mongo', db);
	app.use('/public', express.static(__dirname + '/public'));
	app.use(bodyParser.urlencoded({extended: false}));

	route(app);

	app.listen(app.get('port'), function(err){
		console.log(`Now listening on port ${app.get('port')}...`);
	});

});// /mongo.connect()