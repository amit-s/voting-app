import React,{Component} from 'react';

export default class PollViewContainer extends Component{
	constructor(props){
		super(props);
	}

	handleClick(){
		this.props.updateUserPageView(false);
	}

	render(){
		return(
			<div>				
				<div onClick={this.handleClick.bind(this)}>Back</div>				
			</div>
			);
	}
}