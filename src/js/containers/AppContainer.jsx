import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Nav from '../components/Nav.jsx';





export default class AppContainer extends Component{
	constructor(props){
		super(props);

		this.state = {
			isUserAuthenticated: false,
			username: "",
			ip: ""
		};

		this.checkAuth = this.checkAuth.bind(this);
		this.updateAuth = this.updateAuth.bind(this);
		this.getUsername = this.getUsername.bind(this);
		this.getIP = this.getIP.bind(this);
	}

	checkAuth(){
		return this.state.isUserAuthenticated;
	}

	updateAuth(isUserAuthenticated,username){
		this.setState({isUserAuthenticated, username});
	}

	getUsername(){
		return this.state.username;
	}

	getIP(){
		return this.state.ip;
	}

	renderChildren(children){
		return React.Children.map(children, child=>React.cloneElement(child,{checkAuth: this.checkAuth, updateAuth: this.updateAuth, getUsername: this.getUsername, getIP: this.getIP}));
	}

	componentDidMount(){
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/checkuserauth', true);
		xhr.onload = ()=>{
			let isUserAuthenticated;
			let ip = JSON.parse(xhr.response).ip;

			if(xhr.status === 200){
				isUserAuthenticated = true;
				let username = JSON.parse(xhr.response).username;
				this.setState({username,ip});
			}else{				
				isUserAuthenticated = false;
				
				this.setState({ip});
			}
			this.setState({isUserAuthenticated});
		};
		xhr.send();
	}

	componentWillMount(){
		if(this.props.location.search){
			let pollid = this.props.location.search.split('=')[1];
			browserHistory.push(`/p/${pollid}`);
		}
	}

	render(){
		let username = this.state.username || "";

		return(
			<div>
				<Nav isUserAuthenticated={this.state.isUserAuthenticated} username={username} />
				{this.renderChildren(this.props.children)}
			</div>
			);
	}
}