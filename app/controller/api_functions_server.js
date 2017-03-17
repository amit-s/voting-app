import bcrypt from 'bcryptjs';

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