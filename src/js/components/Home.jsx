import React, {Component} from 'react';
import PollList from './PollList.jsx';
import PollView from './PollView.jsx';
import data from '../../../data/polldata.js';


export default class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
			selectedPoll: 2
		};
	}

	render(){
		let style = {display: "flex"};
		return(
			<div style={style}>
				<PollList data={data}/>
				<PollView data={data[this.state.selectedPoll]}/>
			</div>
			);
	}
}