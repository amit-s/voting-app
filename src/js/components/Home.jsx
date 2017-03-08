import React, {Component} from 'react';
import PollList from './PollList.jsx';
import PollView from './PollView.jsx';
import {updateDB, queryDB} from '../../../app/controller/api_functions.js';

export default class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
			selectedPoll: 0,
			data: []
		};
		this.updateSelectedPoll = this.updateSelectedPoll.bind(this);
		this.updateDataCount = this.updateDataCount.bind(this);		
	}

	updateDataCount(newdata){		
		let data = this.state.data.map(function(item){
			if(item._id == newdata._id){
				return newdata;
			}else{
				return item;
			}
		});

		let params = `data=${JSON.stringify(newdata)}`;
		updateDB(params);
		this.setState({data});
	}

	updateSelectedPoll(newPoll){		
		this.setState({
			selectedPoll: newPoll
		});
	}

	componentDidMount(){				
		queryDB().then(dbData=>this.setState({data: JSON.parse(dbData).data})
		, function(err){
			console.log(err);
		})
	}

	renderHome(){
		let style = {display: "flex"};
		return (<div style={style}>
					<PollList data={this.state.data} updatePoll={this.updateSelectedPoll}/>
					<PollView data={this.state.data[this.state.selectedPoll]} getvote={this.updateDataCount}/>
				</div>);
	}

	render(){
		let style = {display: "flex"};
		
		if(this.state.data.length >= 1){
			return this.renderHome();
		}else{
			return null;
		}		
	}
}