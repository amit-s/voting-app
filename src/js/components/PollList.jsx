import React, {Component} from 'react';

export default class PollList extends Component{

	constructor(props){
		super(props);
		this.getId = this.getId.bind(this);
	}

	getId(e){
		//console.log(e.target.id);
		this.props.updatePoll(e.target.id-1);
	}

	render(){
		let style = {
			flexGrow: 1
		};

		return(
			<div style={style}>
				<h1>Poll Items</h1>
				{this.props.data.map((item)=><div key={item._id} id={item._id} onClick={this.getId}>{item.name}</div>)}
			</div>
			);
	}
}