import React, {Component} from 'react';
import Nav from '../components/Nav.jsx';

export default class AppContainer extends Component{
	constructor(props){
		super(props);

		this.state = {
			isUserAuthenticated: false,
			username: ""
		};

		this.checkAuth = this.checkAuth.bind(this);
		this.updateAuth = this.updateAuth.bind(this);
		this.getUsername = this.getUsername.bind(this);
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

	renderChildren(children){
		return React.Children.map(children, child=>React.cloneElement(child,{checkAuth: this.checkAuth, updateAuth: this.updateAuth, getUsername: this.getUsername}));
	}

	componentDidMount(){
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/checkuserauth', true);
		xhr.onload = ()=>{
			let isUserAuthenticated;

			if(xhr.status === 200){
				isUserAuthenticated = true;
				let username = JSON.parse(xhr.response).username;
				this.setState({username});
			}else{
				isUserAuthenticated = false;
			}
			this.setState({isUserAuthenticated});			
		};
		xhr.send();
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