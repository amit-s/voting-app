import PollVote from '../components/PollVote.jsx';
import React,{Component} from 'react';

export default class PollVoteContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			hasUserVoted: false,
			userVote: "",
			authorizedUser: false,
			username: "",
			ip: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.hasUserVoted = this.hasUserVoted.bind(this);
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
		this.setState({hasUserVoted: hasVoted});
	}	

	componentWillMount(){
		let authorizedUser = this.props.checkAuth();
		let username = this.props.getUsername();
		let ip = this.props.getIP();		
		this.setState({authorizedUser,username,ip});
	}

	componentDidMount(){
		this.hasUserVoted();
	}

	render(){
		return(
			<div>
				{!this.state.hasUserVoted && <PollVote data={this.props.data} getVote={this.handleChange} />}
				{this.state.hasUserVoted && <h3>You have voted for {this.state.userVote}</h3>}
			</div>
			);
	}
}