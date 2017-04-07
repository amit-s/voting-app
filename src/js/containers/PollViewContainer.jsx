import React,{Component} from 'react';
import PollChart from '../components/PollChart.jsx';
import PollControlsContainer from './PollControlsContainer.jsx';
import {queryDB,updateDB} from '../../../app/controller/api_functions_client.js';

export default class PollViewContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			ownPoll: false,
			data: {}

		};
		this.addNewOption = this.addNewOption.bind(this);
		this.handleVote = this.handleVote.bind(this);
	}

	handleBackClick(){
		this.props.updateUserPageView(false);
	}

	addNewOption(data){		
		this.setState({data});
	}

	componentWillMount(){		
		let username = this.props.getUsername();
		let pollid = this.props.params.pollid;

		queryDB(null,pollid).then(
			data=>{
				if(data.createdBy === username){
					var ownPoll = true;
				}
				this.setState({data,ownPoll});
			},
			error=>console.log(error)
			);		
	}

	handleVote(newdata){
		let params = `data=${JSON.stringify(newdata)}`;
		updateDB(params);
		this.setState({data: newdata});
	}

	render(){
		return(
			<div style={{backgroundColor: "rgba(0,0,0,0.1)", paddingTop: 15, borderRadius: 15}}>
				<h1 className="text-center">{this.state.data.name}</h1>
				{this.state.data.name && <PollControlsContainer data={this.state.data} getVote={this.handleVote} addNewOption={this.addNewOption} checkAuth={this.props.checkAuth} getIP={this.props.getIP} getUsername={this.props.getUsername} ownPoll={this.state.ownPoll} />}
				{this.state.data.name && <PollChart data={this.state.data} />}
			</div>
			);
	}
}