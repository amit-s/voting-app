import React,{Component} from 'react';
import {browserHistory} from 'react-router';
import AddUser from '../components/AddUser.jsx';

export default class AddUserContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: "",
			username: "",
			password: "",
			password2: "",
			errors: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		let {name,username,password,password2} = this.state;
		let params = `name=${name}&username=${username}&password=${password}&password2=${password2}`;
		
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/register', true);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		
		xhr.onload = ()=>{
			if(xhr.status === 200){				
				sessionStorage.setItem('success', JSON.parse(xhr.response).success_msg);
				browserHistory.push('/login');
			}else{
				let errors = JSON.parse(xhr.response).errors;
				this.setState({errors});
				document.getElementById("password").value = "";
				document.getElementById("password2").value = "";
			}
		};
		xhr.send(params);		
	}

	handleChange(e){
		let newdata = {};
		newdata[e.target.name] = e.target.value;
		this.setState(newdata);
	}

	render(){		
		let {name,username} = this.state;
		let value = {name,username};
		return <AddUser change={this.handleChange} submit={this.handleSubmit} errors={this.state.errors} value={value} /> ;
	}
}