import React, {Component} from 'react';

export default class PollVote extends Component{
	constructor(props){
		super(props);
		this.state = {
			value: "select"
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){		
		
		let selectedOption = e.target.value;		
		let newdata = JSON.parse(JSON.stringify(this.props.data));
		newdata.options.forEach(function(option){
			if(option.name == selectedOption){
				option.count++;
			}
		});
		
		this.setState({value: "select"});
		this.props.getvote(newdata);
	}

	render(){		
		return(
			<div>
				Vote for : 
				<select name={this.props.data.name} onChange={this.handleChange} value={this.state.value}>
				<option value="select">Select...</option>
				{this.props.data.options.map((option,i)=><option key={i} value={option.name}>{option.name}</option>)}
				</select>				
			</div>
			);
	}
}