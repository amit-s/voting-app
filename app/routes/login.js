import express from 'express';
import React from 'react';
import {match, RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import routes from '../../src/js/components/Routes.jsx';

let Router = express.Router();

Router.route('/')
		.get(function(req,res,next){			
			match({routes,location: req.originalUrl},(error,redirect,renderProps)=>{
				if(renderProps){
					let reactHtml = renderToString(<RouterContext {...renderProps} createElement={(Component,props)=><Component {...props} msg={res.locals}/>}/>);
					res.render('renderReact',{reactHtml});
				}
			});			
		})
		.post(function(req,res,next){

		});


module.exports = Router;