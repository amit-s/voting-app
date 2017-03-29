import {addUser} from '../controller/api_functions_server.js';
import React from 'react';
import {match, RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import routes from '../../src/js/components/Routes.jsx';
import express from 'express';

let Router = express.Router();
let db;

Router.use(function(req,res,next){
	db = req.app.get('mongo');
	next();
});


Router.route('/')
		.get(function(req,res){
			
		})
		.post(function(req,res){

			req.checkBody('name', 'Name is required').notEmpty();
			req.checkBody('username', 'Username is required').notEmpty();
			req.checkBody('password', 'Password is required').notEmpty();
			req.checkBody('password2', 'Passwords should match').equals(req.body.password);

			req.getValidationResult().then(function(result){

				if(!result.isEmpty()){
					res.status(201).json({errors: result.array()});
				}else{
					let newUser = req.body;
					newUser.createdTime = req.time;
					delete newUser['password2'];
					addUser(newUser,db).then((success)=>{
						console.log(success);
						req.flash('success_msg', 'Account successfully created. Go ahead and login below');
						res.status(200).json({'success_msg': 'Account successfully created. Go ahead and login below'});
					}, (error)=>{
						console.error('username exists');
						res.status(201).json({errors: [{msg: 'Username already exists'}]});
					});
					
				}
			});
		});

module.exports = Router;