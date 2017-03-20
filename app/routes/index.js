import React from 'react';
import {match, RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import routes from '../../src/js/components/Routes.jsx';
import {addUser, addPoll} from '../controller/api_functions_server.js';



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
			addPoll(req,db).then(function(msg){
				console.log(msg);
				res.redirect('/');
			})
		});

	app.route('/register')
		.get(function(req,res){			
			let location = req.url;
			match({routes,location},(error,redirect,renderProps)=>{
				if(renderProps){
					let reactHtml = renderToString(<RouterContext {...renderProps} createElement={(Component,props)=><Component {...props} userdata={req.app.dataAddUser} msg={res.locals}/>} />);
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

				let data = {};
					data.userinfo = req.body;
					data.errors = result.array();
					req.app.dataAddUser = data;

				if(!result.isEmpty()){										
					res.redirect('/register');

				}else{
					//console.log('no errors');
					let newUser = req.body;
					newUser.createdTime = req.time;
					delete newUser['password2'];
					addUser(newUser,db).then((success)=>{
						console.log(success);
						req.flash('success_msg', 'Account successfully created. Go ahead and login below');					
						res.redirect('/login');
					}, (error)=>{
						console.error('username exists');
						req.flash('error_msg','Username already exists...');
						res.redirect('/register');
					});
					
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