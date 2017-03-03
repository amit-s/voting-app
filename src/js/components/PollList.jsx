import React, {Component} from 'react';

export default class PollList extends Component{
	render(){
		return(
			<div>
				<h1>Poll Item</h1>
				{this.props.data.map((item)=><div key={item._id}>{item.name}</div>)}
			</div>
			);
	}
}