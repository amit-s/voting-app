require('babel-register')({
	presets: ['es2015','react']
})

let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('connect-flash');
let mongo = require('mongodb').MongoClient;
let express = require('express');
let route = require('./app/routes/index.js');
let expressValidator = require('express-validator');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let port = process.env.PORT || 3000;
let mongoURL = process.env.MONGO_URI || 'mongodb://localhost:27017/polls'

let app = express();

mongo.connect(mongoURL, function(err,db){

	if(err)
		throw new Error(err);

	console.log(`Successfully connected to database...`);
   	
	app.set('port', port);
	app.set('mongo', db);
	app.set('view engine', 'pug');

	app.use('/public', express.static(__dirname + '/public'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(session({
		secret: 'secret',
		saveUninitialized: false,
		resave: true
	}));
	app.use(flash());
	app.use(expressValidator({
		errorFormatter: function(param, msg, value) {
			let namespace = param.split('.'),
				root = namespace.shift(),
				formParam = root;

			while(namespace.length) {
				formParam += '[' + namespace.shift() + ']';
			}
			return {
				param : formParam,
				msg   : msg,
				value : value
			};
		}
	}));
	

	app.use(function(req,res,next){
		res.locals.success_msg = req.flash('success_msg');
		res.locals.error_msg = req.flash('error_msg');
		res.locals.error = req.flash('error');
		next();
	});

	app.use(passport.initialize());
	app.use(passport.session());

	route(app);

	app.all('*',function(req,res){
		res.redirect('/');
	});

	app.listen(app.get('port'), function(err){
		console.log(`Now listening on port ${app.get('port')}...`);
	});

});// /mongo.connect()