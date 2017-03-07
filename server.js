let bodyParser = require('body-parser');
let mongo = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let express = require('express');
let app = express();

let port = process.env.PORT || 3000;
let mongoURL = process.env.MONGO_URI || 'mongodb://localhost:27017/polls'
app.set('port', port);

mongo.connect(mongoURL, function(err,db){

	if(err)
		throw new Error(err);

	console.log(`Successfully connected to database...`);

	app.use('/public', express.static(__dirname + '/public'));
	app.use(bodyParser.urlencoded({extended: false}));

	app.route('/')
		.get(function(req,res){	
		res.sendFile(__dirname + '/public/index.html');
		})
		.post(function(req,res){
			//console.log(req.body);
			let newItem = {};
			newItem.options = [];
			let query = req.body;
			for(var key in req.body){
				if(key == "pollName"){
					newItem.name = query[key];
				}else{
					newItem.options.push({name: query[key], count: 0});
				}
			}
			db.collection('general').insert(newItem, function(){
				console.log('db item inserted...');
				//res.sendFile(__dirname + '/public/index.html');
				res.redirect('/');
			});
		});

	app.route('/api/data')
		.get(function(req,res){
			db.collection('general').find({}).toArray(function(err,data){				
				res.json({data});
			});
		})
		.post(function(req,res){			
			let newdata = JSON.parse(req.body.data);
			
			db.collection('general').updateOne(
				{
					_id: ObjectID.createFromHexString(newdata._id)
				},
				{
					$set: {
						options: [...newdata.options]
					}
				})
		});

	app.listen(app.get('port'), function(err){
		console.log(`Now listening on port ${app.get('port')}...`);
	});

});// /mongo.connect()