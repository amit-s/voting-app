import React,{Component} from 'react';
import {browserHistory} from 'react-router';
import PollItem from '../components/PollItem.jsx';

export default class PollItemContainer extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);		
	}

	handleClick(e){		
		//this.props.updateUserPageView(true);				
		//console.log(e.target.parentNode.id);
		//this.props.updateSelectedPoll(e.target.parentNode.id);
		//console.log(e.target.parentNode.id);
		//browserHistory.push('/p/somepollid');
		browserHistory.push(`/p/${e.target.parentNode.id}`);
	}


	render(){
		let style = {
			display: 'flex',
			flexWrap: 'wrap'
		};
		

		return(
			<div style={style}>
				{this.props.data.map((poll,i)=>(<PollItem pollData={poll} key={i} id={poll._id} handleClick={this.handleClick} />))}
			</div>
			);
	}
}