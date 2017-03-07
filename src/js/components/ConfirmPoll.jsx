import React, {Component} from 'react';
import renderChart from '../d3chart.js';
import data from '../../../data/polldata.js';
import {browserHistory} from 'react-router';



export default class ConfirmPoll extends Component{

	componentDidMount(){
		let query = this.props.location.query;
		//console.log(query);
		//let _id = data.length;
		let newData = {_id: data.length};
		let options = [];
		for(var key in query){
			//console.log(key);
			if(key === "pollName"){
				newData.name = query[key];
			}else{
				options.push(query[key]);
			}
		}
		newData.options = options;
		//console.log(newData);

		browserHistory.push({
			pathname: '/',
			state: {data: newData}
		});
		
	}

	render(){
		return(
			<h1>Poll added</h1>
			);
	}
}