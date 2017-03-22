import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class Login extends Component{

	

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
				console.log('you are logged in');
				localStorage.setItem('user', user)
				browserHistory.push(`/user/${user}`);
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
		return(
			<div>
				{this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
				<form onSubmit={this.handleLogin}>
					<div className="form-group">
						<label>Username</label>
						<input type="text" className="form-control" name="username" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" name="password" onChange={this.handleChange} />
					</div>
					<input className="btn" type="submit" value="Sign In" />
				</form>
			</div>
			);
	}
}

