import React, {Component} from 'react';
import Nav from '../components/Nav.jsx';

export default class AppContainer extends Component{
	constructor(props){
		super(props);

		this.state = {
			isUserAuthenticated: false
		};

		this.checkAuth = this.checkAuth.bind(this);
		this.updateAuth = this.updateAuth.bind(this);
	}

	checkAuth(){
		return this.state.isUserAuthenticated;
	}

	updateAuth(isUserAuthenticated){
		this.setState({isUserAuthenticated});
	}

	renderChildren(children){
		return React.Children.map(children, child=>React.cloneElement(child,{checkAuth: this.checkAuth, updateAuth: this.updateAuth}));
	}

	componentDidMount(){
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/checkuserauth', true);
		xhr.onload = ()=>{
			let isUserAuthenticated;

			if(xhr.status === 200){
				isUserAuthenticated = true;
			}else{
				isUserAuthenticated = false;
			}
			this.setState({isUserAuthenticated});			
		};
		xhr.send();
	}

	render(){
		
		return(
			<div>
				<Nav isUserAuthenticated={this.state.isUserAuthenticated} />
				{this.renderChildren(this.props.children)}
			</div>
			);
	}
}