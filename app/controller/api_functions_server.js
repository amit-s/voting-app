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

export function getPollById(id, db, callback){	
	let searchid = ObjectID.createFromHexString(id);
	let query = {_id: searchid};	
	db.collection('polls').findOne(query, callback);
}

export function comparePassword(inputPassword,hash,callback){

	bcrypt.compare(inputPassword, hash, function(err, isMatch) {
    	if (err) throw 	err;
    	callback(null, isMatch)
	});

};

export function addPoll(db,newPoll){
	return new Promise((resolve,reject)=>{
		newPoll.votes = {
			user: [],
			ip: []
		};
		
		db.collection('polls').insertOne(newPoll, function(err){
			if(err){
				reject(err);
			}else{
				resolve('db item inserted');
			}
		});
	});
}

export function getPolls(db,username){	
	return new Promise((resolve,reject)=>{
		let query = username ? {createdBy: username} : {};
		db.collection('polls').find(query).sort({'createdTime': -1}).toArray(function(err,data){
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

		db.collection('polls').updateOne(
			{
				_id: ObjectID.createFromHexString(newdata._id)
			},
			{
				$set: {
					options: [...newdata.options],
					votes: newdata.votes
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