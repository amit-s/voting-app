import React,{Component} from 'react';
import PollChart from '../components/PollChart.jsx';
import PollControlsContainer from './PollControlsContainer.jsx';

export default class PollViewContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			ownPoll: false,
			data: {}

		};
		this.addNewOption = this.addNewOption.bind(this);
	}

	handleBackClick(){
		this.props.updateUserPageView(false);
	}

	addNewOption(data){		
		this.setState({data});
	}

	componentWillMount(){
		let username = this.props.getUsername();
		let pollOwner = this.props.data.createdBy;
		let data = this.props.data;
		let newState = {};
		newState.data = data;		

		if(username === pollOwner){			
			newState.ownPoll = true;
		}

		this.setState(newState);		
	}

	componentWillReceiveProps(newprops){		
		let data = newprops.data;
		this.setState({data});
	}

	render(){	
		return(
			<div>
				<div onClick={this.handleBackClick.bind(this)}>Back</div>
				<PollChart data={this.state.data} />
				<PollControlsContainer getvote={this.props.handleVote} data={this.state.data} updateData={this.props.updateData} addNewOption={this.addNewOption} checkAuth={this.props.checkAuth} getIP={this.props.getIP} getUsername={this.props.getUsername} ownPoll={this.state.ownPoll} />
			</div>
			);
	}
}