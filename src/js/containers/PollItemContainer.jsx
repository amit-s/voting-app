import React,{Component} from 'react';
import {browserHistory} from 'react-router';
import PollItem from '../components/PollItem.jsx';

export default class PollItemContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			
			username: "",
			ip: "",
			authorizedUser: false,
			hasVoted: false
		};
		this.handleClick = this.handleClick.bind(this);		
	}

	handleClick(e){
		browserHistory.push(`/p/${e.target.parentNode.id || e.target.id}`);
	}

	hasUserVoted(poll){
		let hasVoted = false;

		if(this.state.authorizedUser){
			let username = this.state.username;
			let votes = poll.votes.user;
			
			votes.forEach((vote)=>{
				if(vote.username === username){
					hasVoted = true;
				}
			});
		}else{
			let ip = this.state.ip;
			let votes = poll.votes.ip;
			
			votes.forEach((vote)=>{
				if(vote.ip === ip){
					hasVoted = true;
				}
			});
		}
		
		return hasVoted;
	}

	componentWillMount(){
		let authorizedUser = this.props.checkAuth();
		let username = this.props.getUsername();
		let ip = this.props.getIP();
		

		this.setState({authorizedUser,username,ip})
	}


	render(){
		let style = {
			display: 'flex',
			flexWrap: 'wrap'
		};
		

		return(
			<div style={style}>
				{this.props.data.map((poll,i)=>(<PollItem pollData={poll} key={i} id={poll._id} hasVoted={this.hasUserVoted(poll)}  handleClick={this.handleClick} />))}
			</div>
			);
	}
}



