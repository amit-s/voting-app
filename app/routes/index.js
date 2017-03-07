let apiRouter = require('./api.js');


module.exports = function(app){

	let db;
	app.use('/api', apiRouter);
	app.use(function(req,res,next){
		req.time = Date.now();
		db = req.app.get('mongo');
		next();
	});

	app.route('/')
		.get(function(req,res){	
			res.sendFile(process.cwd() + '/public/index.html');
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
}