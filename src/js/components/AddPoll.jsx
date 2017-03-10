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
			options.push(<input className="form-control" type="input" name={`option${i}`} key={i} />);
		}

		return(
			<div>
				<h1> Add a Poll here</h1>
				<form action="/" method="post">
					<div className="form-group">
						<label>Poll Name: </label>
						<input className="form-control" type="text" name="pollName" />
					</div>
					<div className="form-group">
						<label>Options:</label>
						{options}
					</div>
					<div className="form-group">
						<input type="button" className="btn" name="add" value="+" onClick={this.updateOptionCount} />
						<input type="button" className="btn" name="remove" value="-" onClick={this.updateOptionCount} />
					</div>
					<input type="submit" className="btn" value="Add Poll" />
				</form>
			</div>
			);
	}
}