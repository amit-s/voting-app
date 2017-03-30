import React,{Component} from 'react';
import PollChart from '../components/PollChart.jsx';
import PollControlsContainer from './PollControlsContainer.jsx';

export default class PollViewContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			ownPoll: false
		};
		
	}

	handleBackClick(){
		this.props.updateUserPageView(false);
	}

	componentWillMount(){
		let username = this.props.getUsername();
		let pollOwner = this.props.data.createdBy;
		

		if(username === pollOwner){
			this.setState({ownPoll: true});
		}

		
	}

	render(){
		return(
			<div>
				<div onClick={this.handleBackClick.bind(this)}>Back</div>
				<PollChart data={this.props.data} />
				<PollControlsContainer getvote={this.props.handleVote} data={this.props.data} updateData={this.props.updateData} checkAuth={this.props.checkAuth} getIP={this.props.getIP} getUsername={this.props.getUsername} ownPoll={this.state.ownPoll} />
			</div>
			);
	}
}