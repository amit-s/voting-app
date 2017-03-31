import React,{Component} from 'react';
import {browserHistory} from 'react-router';
import PollVote from '../components/PollVote.jsx';
import AddPollOptionContainer from './AddPollOptionContainer.jsx';
import DeletePoll from '../components/DeletePoll.jsx';
import {deletePoll} from '../../../app/controller/api_functions_client.js'


export default class PollControlsContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			hasUserVoted: false,
			userVote: "",
			authorizedUser: false,
			username: "",
			ip: "",
			showAddOption: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.hasUserVoted = this.hasUserVoted.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleChange(e){
		if(selectedOption === 'select'){
			return;
		}
		let newdata = JSON.parse(JSON.stringify(this.props.data));
		let selectedOption = e.target.value;

		if(this.state.authorizedUser){
			newdata.votes.user.push({username: this.state.username, vote: selectedOption});
		}else{			
			newdata.votes.ip.push({ip: this.state.ip, vote: selectedOption});
		}
		newdata.options.forEach(function(option){
			if(option.name == selectedOption){
				option.count++;
			}
		});
		this.setState({hasUserVoted: true, userVote: selectedOption });
		this.props.getvote(newdata);
	}

	hasUserVoted(){
		let hasVoted = false;

		if(this.state.authorizedUser){
			let username = this.state.username;
			let votes = this.props.data.votes.user;
			
			votes.forEach((vote)=>{
				if(vote.username === username){
					hasVoted = true;
					this.setState({userVote: vote.vote})
				}
			});
		}else{
			let ip = this.state.ip;
			let votes = this.props.data.votes.ip;
			
			votes.forEach((vote)=>{
				if(vote.ip === ip){
					hasVoted = true;
					this.setState({userVote: vote.vote})
				}
			});
		}
		let update = {};
		update.hasUserVoted = hasVoted;

		if(this.state.authorizedUser && !hasVoted){
			update.showAddOption = true;
		}		
		this.setState(update);		
	}

	handleDelete(pollname){		
		deletePoll(pollname).then(
			(success)=>{
				browserHistory.push(`/${this.state.username}/polls`);
				this.props.updateData(pollname);
			},
			(error)=>console.log(error)
			);
	}

	componentWillMount(){
		let authorizedUser = this.props.checkAuth();
		let username = this.props.getUsername();
		let ip = this.props.getIP();
		this.setState({authorizedUser,username,ip},function(){
			this.hasUserVoted();
		});
		
	}

	

	componentWillReceiveProps(){
		this.setState({showAddOption: false})
	}

	render(){
		return(
			<div>
				{!this.state.hasUserVoted && <PollVote data={this.props.data} getVote={this.handleChange} />}
				{this.state.hasUserVoted && <h3>You voted for "{this.state.userVote}"</h3>}
				{this.state.showAddOption && <AddPollOptionContainer addNewOption={this.props.addNewOption} data={this.props.data} />}
				{this.props.ownPoll && <DeletePoll handleDelete={this.handleDelete} pollname={this.props.data.name} />}
			</div>
			);
	}
}