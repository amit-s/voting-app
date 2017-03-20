import bcrypt from 'bcryptjs';
let ObjectID = require('mongodb').ObjectID;

export function addUser(newUser,db){	
	let user = Object.assign({},newUser);
	
	return new Promise((resolve,reject)=>{
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(user.password, salt, function(err, hash) {
		        user.password = hash;	        
	        	db.collection('users').insertOne(user, function(err){
	        		if(err){
	        			reject(err);
	        		}else{
	        			resolve('User added to DB');
	        		}
	        	});	        
		    });
		});
	});	
}

export function getUserByUsername(username, db, callback){
	let query = {username};
	db.collection('users').findOne(query, callback);
}

export function getUserById(id, db, callback){
	
	let searchid = ObjectID.createFromHexString(id)	

	let query = {_id: searchid};
	
	db.collection('users').findOne(query, callback);
}

export function comparePassword(inputPassword,hash,callback){

	bcrypt.compare(inputPassword, hash, function(err, isMatch) {
    	if (err) throw 	err;
    	callback(null, isMatch)
	});

};

export function addPoll(req,db){
	return new Promise((resolve,reject)=>{
		let query = req.body;
		let newItem = {};
			newItem.options = [];
	
		for(var key in query){
			if(key == "pollName"){
				newItem.name = query[key];
				newItem.timestamp = req.time;
			}else{
				newItem.options.push({name: query[key], count: 0});
			}
		}
		
		db.collection('general').insertOne(newItem, function(err){
			if(err){
				reject(err);
			}else{
				resolve('db item inserted');
			}
		});		
	});
}

export function getPolls(db){
	return new Promise((resolve,reject)=>{
		db.collection('general').find({}).toArray(function(err,data){
			if(err){				
				reject(err);
			}
			if(data.length<1){				
				reject('database is empty');
			}else{				
				resolve(data);
			}
		});
	});
}

export function updateVoteCount(db, newdata){
	return new Promise((resolve,reject)=>{

		db.collection('general').updateOne(
			{
				_id: ObjectID.createFromHexString(newdata._id)
				
			},
			{
				$set: {
					options: [...newdata.options]
				}
			},
			function(err){
				if(err){
					reject(err);
				}else{
					resolve('Poll updated');
				}
			}
		)
	});
}