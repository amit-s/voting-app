let apiRouter = require('./api.js');


module.exports = function(app){



	let db;
	
	app.use(function(req,res,next){
		req.time = Date.now();
		db = req.app.get('mongo');
		next();
	});

	app.use('/api', apiRouter);

	app.route('/')
		.get(function(req,res){			
			res.render('index');
		})
		.post(function(req,res){
			let newItem = {};
			newItem.options = [];
			let query = req.body;
			for(var key in query){
				if(key == "pollName"){
					newItem.name = query[key];
					newItem.timestamp = req.time;
				}else{
					newItem.options.push({name: query[key], count: 0});
				}
			}
			db.collection('general').insert(newItem, function(){
				console.log('db item inserted...');
				res.redirect('/');
			});
		});

	app.route('/register')
		.get(function(req,res){
			console.log(req.app.dataAddUser);
			res.render('index',{testdata: "XXXXX"});

		})
		.post(function(req,res){
			let { name,username,password,password2 } = req.body;

			req.checkBody('name', 'Name is required').notEmpty();
			req.checkBody('username', 'Username is required').notEmpty();
			req.checkBody('password', 'Password is required').notEmpty();
			req.checkBody('password2', 'Passwords should match').equals(req.body.password);

			req.getValidationResult().then(function(result){

				if(!result.isEmpty()){
					//console.log('errors');
					
					let data = {};
					data.userinfo = req.body;
					data.errors = result.array();
					req.app.dataAddUser = data;
					res.redirect('/register');

				}else{
					console.log('no errors');
				}

			});
			

		});
}