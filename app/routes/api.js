let express = require('express');
let Router = express.Router();
let ObjectID = require('mongodb').ObjectID;
let db;

Router.use(function(req,res,next){
	db = req.app.get('mongo');	
	next();
});

Router.route('/data')
	.get(function(req,res){
		
		db.collection('general').find({}).toArray(function(err,data){
			if(err)
				throw new Error(err);
			if(data.length<1){
				console.log('database is empty');
			}else{
				/*res.set({
					"Access-Control-Allow-Origin": "*"
				});*/
				res.json({data});
			}
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
		res.end();
	});

module.exports = Router;