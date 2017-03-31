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
		this.updateDataset = this.updateDataset.bind(this);
		this.deletePollFromData = this.deletePollFromData.bind(this);
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
		this.updateDataset(this.props);
	}

	componentWillReceiveProps(nextProps){
		this.setState({displayPollView: false});
		this.updateDataset(nextProps);
	}

	updateDataset(props){
		let username;
		if(props.location.pathname === '/polls'){
			username = "";
		}else{
			username = this.props.getUsername();
		}		

		queryDB(username).then((userdata)=>{
				let data = userdata.data;
				this.setState({data});
			}, (error)=>(console.log(error)));
	}

	deletePollFromData(pollname){
		let data = JSON.parse(JSON.stringify(this.state.data));
		data = data.filter((poll)=>poll.name !== pollname);		
		this.setState({data});
	}

	render(){		
		return(
			<div>
				{this.state.data.length > 0 || <h3>Create your first poll by clicking "Add Poll" above!</h3>}
				{!this.state.displayPollView && <PollItemContainer data={this.state.data} updateUserPageView={this.updateUserPageView} updateSelectedPoll={this.updateSelectedPoll} />}
				{this.state.displayPollView && <PollViewContainer data={this.state.data[this.state.selectedPoll]} updateData={this.deletePollFromData} updateUserPageView={this.updateUserPageView} handleVote={this.handleVote} checkAuth={this.props.checkAuth} getIP={this.props.getIP} getUsername={this.props.getUsername} />}
			</div>
			);
	}
}