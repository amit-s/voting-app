import React,{Component} from 'react';
import {queryDB} from '../../../app/controller/api_functions_client.js';
import PollItemContainer from './PollItemContainer.jsx';
import PollViewContainer from './PollViewContainer.jsx';

export default class UserPageContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
			displayPollView: false
			
		};
		this.updateUserPageView = this.updateUserPageView.bind(this);
	}

	updateUserPageView(status){
		this.setState({displayPollView: status});
	}

	componentDidMount(){
		let username = this.props.getUsername() || "";
		queryDB(username).then((data)=>{			
			let userdata = JSON.parse(data).data;			
			this.setState({data: userdata})
		});
	}

	render(){		
		return(
			<div>
				{!this.state.displayPollView && <PollItemContainer data={this.state.data} updateUserPageView={this.updateUserPageView} />}
				{this.state.displayPollView && <PollViewContainer data={this.state.data} updateUserPageView={this.updateUserPageView} />}
			</div>
			);
	}
}