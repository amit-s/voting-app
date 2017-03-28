import React,{Component} from 'react';
import PollItem from '../components/PollItem.jsx';

export default class PollItemContainer extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){		
		this.props.updateUserPageView(true);				
		console.log(e.target.parentNode.id);
	}

	render(){
		let style = {
			display: 'flex',
			flexWrap: 'wrap'
		};

		return(
			<div style={style}>
				{this.props.data.map((poll,i)=>(<PollItem pollData={poll} key={i} handleClick={this.handleClick} />))}				
			</div>
			);
	}
}