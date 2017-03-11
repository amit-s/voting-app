import React from 'react';
import {match, RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import routes from '../../src/js/components/Routes.jsx';


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
			
			let location = req.url;
			match({routes,location},(error,redirect,renderProps)=>{

				if(renderProps){
					let reactHtml = renderToString(<RouterContext {...renderProps} createElement={(Component,props)=><Component {...props} userdata={req.app.dataAddUser}/>} />);
					res.render('renderReact',{reactHtml});
				}
			});
			

		})
		.post(function(req,res){
			let { name,username,password,password2 } = req.body;

			req.checkBody('name', 'Name is required').notEmpty();
			req.checkBody('username', 'Username is required').notEmpty();
			req.checkBody('password', 'Password is required').notEmpty();
			req.checkBody('password2', 'Passwords should match').equals(req.body.password);

			req.getValidationResult().then(function(result){

				if(!result.isEmpty()){					
					let data = {};
					data.userinfo = req.body;
					data.errors = result.array();
					req.app.dataAddUser = data;
					res.redirect('/register');

				}else{
					console.log('no errors');
					req.flash('success_msg', 'Account successfully created. Go ahead and login below');
					res.redirect('/login');
				}
			});			
		});

	app.route('/login')
		.get(function(req,res,next){			
			match({routes,location: req.url},(error,redirect,renderProps)=>{
				if(renderProps){
					let reactHtml = renderToString(<RouterContext {...renderProps} createElement={(Component,props)=><Component {...props} msg={res.locals}/>}/>);
					res.render('renderReact',{reactHtml});

				}
			});
			
		});

}