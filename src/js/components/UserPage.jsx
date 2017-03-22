import React,{Component} from 'react';

export default class UserPage extends Component{
	render(){
		return(
			<div>
				<h1>User Page for user {localStorage.getItem('user')}</h1>
			</div>
			);
	};
}