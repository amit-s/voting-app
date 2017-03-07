import React, {Component} from 'react';

export default class PollList extends Component{

	constructor(props){
		super(props);
		this.getId = this.getId.bind(this);
	}

	getId(e){		
		this.props.updatePoll(e.target.id);
	}

	render(){
		let style = {
			flexGrow: 1
		};

		return(
			<div style={style}>
				<h1>Poll List:</h1>
				{this.props.data.map((item,i)=><div key={item._id} id={i} onClick={this.getId}>{item.name}</div>)}
			</div>
			);
	}
}