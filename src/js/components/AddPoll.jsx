import React, {Component} from 'react';

export default class AddPoll extends Component{
	constructor(props){
		super(props);
		this.state = {
			optionCount: 2
		};
		this.updateOptionCount = this.updateOptionCount.bind(this);
	}

	updateOptionCount(e){
		
		let count = this.state.optionCount;

		if(e.target.name === "add"){
			this.setState({
				optionCount: ++count
			});
		}else{
			count--;
			count = count<2 ? 2 : count;

			this.setState({
				optionCount: count
			});
		}		
	}

	render(){
		let options = [];
		for(var i=0; i<this.state.optionCount; i++){
			options.push(<input type="input" name={`option${i}`} key={i} />);
		}

		return(
			<div>
				<h1> Add a Poll here</h1>
				<form action="/" method="post">
				Poll Name: 
				<input type="text" name="pollName" /><br/>
				Options:
				{options}
				<br/>
				<input type="button" name="add" value="+" onClick={this.updateOptionCount} />
				<input type="button" name="remove" value="-" onClick={this.updateOptionCount} /><br/>
				<input type="submit" value="Add Poll" />
				</form>
			</div>
			);
	}
}