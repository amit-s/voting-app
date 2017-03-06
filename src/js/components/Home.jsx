import React, {Component} from 'react';
import PollList from './PollList.jsx';
import PollView from './PollView.jsx';
import data from '../../../data/polldata.js';


export default class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
			selectedPoll: 5
		};
		this.updateSelectedPoll = this.updateSelectedPoll.bind(this);
	}

	updateSelectedPoll(newPoll){
		
		this.setState({
			selectedPoll: newPoll
		});
	}

	render(){
		let style = {display: "flex"};
		return(
			<div style={style}>
				<PollList data={data} updatePoll={this.updateSelectedPoll}/>
				<PollView data={data[this.state.selectedPoll]}/>
			</div>
			);
	}
}