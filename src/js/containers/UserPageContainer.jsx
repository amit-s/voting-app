import React,{Component} from 'react';
import {queryDB,updateDB} from '../../../app/controller/api_functions_client.js';
import PollItemContainer from './PollItemContainer.jsx';
import PollViewContainer from './PollViewContainer.jsx';


export default class UserPageContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
			selectedPoll: 0,
			displayPollView: false
			
		};
		this.updateUserPageView = this.updateUserPageView.bind(this);
		this.updateSelectedPoll = this.updateSelectedPoll.bind(this);
		this.handleVote = this.handleVote.bind(this);
	}

	updateUserPageView(status){
		this.setState({displayPollView: status});
	}

	updateSelectedPoll(selectedPoll){
		this.setState({selectedPoll});
	}

	handleVote(newdata){		
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

	componentDidMount(){
		let username = this.props.getUsername() || "";
		queryDB(username).then((data)=>{			
			let userdata = JSON.parse(data).data;			
			this.setState({data: userdata})
		});
	}

	componentWillReceiveProps(nextProps){		
		this.setState({displayPollView: false});
	}

	render(){

		return(
			<div>
				{this.state.data.length > 0 || <h3>You have no polls. Go ahead and create one.</h3>}
				{!this.state.displayPollView && <PollItemContainer data={this.state.data} updateUserPageView={this.updateUserPageView} updateSelectedPoll={this.updateSelectedPoll} />}
				{this.state.displayPollView && <PollViewContainer data={this.state.data[this.state.selectedPoll]} updateUserPageView={this.updateUserPageView} handleVote={this.handleVote} />}
			</div>
			);
	}
}