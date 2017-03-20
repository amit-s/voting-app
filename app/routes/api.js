import {getPolls, updateVoteCount} from '../controller/api_functions_server.js';
import express from 'express';


let Router = express.Router();

let db;

Router.use(function(req,res,next){
	db = req.app.get('mongo');
	next();
});

Router.route('/data')
	.get(function(req,res){
		getPolls(db).then(
			data=>res.json({data}),
			err=>console.log(err)
		);
	})
	.post(function(req,res){
		let newdata = JSON.parse(req.body.data);		
		updateVoteCount(db,newdata).then(success=>console.log(success),error=>console.log(error));
		res.end();
	});

module.exports = Router;