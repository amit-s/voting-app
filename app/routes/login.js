import express from 'express';
import React from 'react';
import {match, RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import routes from '../../src/js/components/Routes.jsx';
import passport from 'passport';
import {getUserByUsername, getUserById, comparePassword} from '../controller/api_functions_server.js';
let LocalStrategy = require('passport-local').Strategy;
let db;

passport.use(new LocalStrategy(function(username,password,done){
	getUserByUsername(username,db,function(err,user){
		if(err){
			return done(err);
		}
		if(!user){
			return done(null,false,{message: 'Incorrect username'});
		}
		
		comparePassword(password, user.password, function(err, isMatch){
			if(err){
				return done(err);
			}
			if(isMatch){
				return done(null,user);
			}else{
				return done(null, false, {message: 'Incorrect password'});
			}
		})
		
	});
}));

passport.serializeUser(function(user, done){	
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	getUserById(id,db, function(err, user){

		done(err, user);
	});
});

let Router = express.Router();

Router.use(function(req,res,next){
	db = req.app.get('mongo');
	next();
});

Router.route('/')
		.get(function(req,res,next){			
			match({routes,location: req.originalUrl},(error,redirect,renderProps)=>{
				if(renderProps){					
					let reactHtml = renderToString(<RouterContext {...renderProps} createElement={(Component,props)=><Component {...props} msg={res.locals}/>}/>);
					res.render('renderReact',{reactHtml});
				}
			});			
		})
		.post(passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}),
			function(req,res,next){
				console.log('you are logged in!');				
				res.redirect('/user');
			}
		);

module.exports = Router;