import React from 'react';
import {match, RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import routes from '../../src/js/components/Routes.jsx';
import {addUser, addPoll} from '../controller/api_functions_server.js';
import registerRouter from './register.js';
import apiRouter from './api.js';
import loginRouter from './login.js';

module.exports = function(app){

	let db;
	
	app.use(function(req,res,next){		
		req.time = Date.now();
		db = req.app.get('mongo');
		next();
	});

	app.use('/api', apiRouter);
	app.use('/register', registerRouter);
	app.use('/login', loginRouter);

	app.route('/')
		.get(function(req,res){			
			res.render('index');
		})
		.post(function(req,res){			
			addPoll(req,db).then(function(msg){				
				res.redirect('/');
			})			
		});

	app.get('/logout', function(req,res,next){
		req.logout();
		res.status(200).end();
	});

	app.get('/checkuserauth', function(req,res,next){
		if(req.user){
			res.status(200).end();
		}else{
			res.status(201).end();
		}
	});
}