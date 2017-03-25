import {getPolls, updateVoteCount} from '../controller/api_functions_server.js';
import express from 'express';
import {addPoll} from '../controller/api_functions_server';


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

	Router.route('/addpoll')
			.post(function(req,res,){
				req.checkBody('name', 'Poll name is required').notEmpty();
				req.checkBody('option0', 'First option is required').notEmpty();
				req.checkBody('option1', 'Second option is required').notEmpty();

				req.getValidationResult().then(function(result){
					if(!result.isEmpty()){															
						res.status(400).json({errors: result.array()});
					}else{
						let pollData = req.body;
						let newPoll = {};
						newPoll.createdTime = req.time;
						newPoll.createdBy = req.user.username;
						newPoll.options = [];

						for(let key in pollData){
							if(key === 'name'){
								newPoll.name = pollData[key];
							}else{
								let option = {};
								option.name = pollData[key];
								option.count = 0;
								newPoll.options.push(option);
							}
						}
						
						addPoll(db,newPoll).then((success)=>{
							console.log(success);
							res.status(200).end();
						});
					}
				});
			});

module.exports = Router;