import React, {Component} from 'react';

export default class PollList extends Component{

	constructor(props){
		super(props);
		this.getId = this.getId.bind(this);
	}

	getId(e){		
		this.props.updatePoll(e.target.value);		
	}

	render(){
		return(
			<div>
				<h1>Poll List:</h1>				
				<select className="form-control" name="xxx" onChange={this.getId} >					
					{this.props.data.map((poll,i)=><option key={i} value={i}>{poll.name}</option>)}
				</select>
			</div>
			);
	}
}