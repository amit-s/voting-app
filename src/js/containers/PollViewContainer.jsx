import React,{Component} from 'react';
import PollChart from '../components/PollChart.jsx';
import PollVoteContainer from './PollVoteContainer.jsx';

export default class PollViewContainer extends Component{
	constructor(props){
		super(props);
	}

	handleBackClick(){
		this.props.updateUserPageView(false);
	}

	render(){
//console.log(this.props);
		return(
			<div>
				<div onClick={this.handleBackClick.bind(this)}>Back</div>
				<PollChart data={this.props.data} />
				<PollVoteContainer getvote={this.props.handleVote} data={this.props.data} checkAuth={this.props.checkAuth} getIP={this.props.getIP} getUsername={this.props.getUsername} />
			</div>
			);
	}
}