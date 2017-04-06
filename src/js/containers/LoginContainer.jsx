import React, {Component} from 'react';
import {Router, browserHistory} from 'react-router';
import Login from '../components/Login.jsx';

export default class LoginContainer extends Component{

	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: "",
			error: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(e){		
		
		e.preventDefault();
		let params = `username=${this.state.username}&password=${this.state.password}`;
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/login', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = ()=>{	
		
			if(xhr.status == 400){
				this.setState({
					error: JSON.parse(xhr.response).message
				});
			}

			if(xhr.status == 200){
				let user = JSON.parse(xhr.response).user;
				this.setState({
					error: ""
				});				
				
				this.props.updateAuth(true,user);
				browserHistory.push(`/u/${user}`);
			}
		};
		xhr.send(params);
	}

	handleChange(e){		
		let data = {};
		data[e.target.name] = e.target.value;
		this.setState(data);
	}

	render(){
		if(sessionStorage.getItem('success')){
			var success = sessionStorage.getItem('success');
			sessionStorage.removeItem('success');
		}
		return(			
			<Login success={success} error={this.state.error} handleChange={this.handleChange} handleLogin={this.handleLogin} />
		
		);
	}
}