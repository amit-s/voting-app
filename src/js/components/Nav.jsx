import React, {Component} from 'react';
import {Link} from 'react-router';
import NavLink from './NavLink.jsx';

export default class Nav extends Component{
	render(){
		
		return(
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">
					
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="navbar-collapse-menu" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>							
							<span className="icon-bar">Sign In</span>
							<span className="icon-bar">Register</span>}							
							</button>
							<a className="navbar-brand" href="/">Voting App</a>
						</div>						
						<div className="collapse navbar-collapse" id="navbar-collapse-menu">
							<ul className="nav navbar-nav">								
								<li><NavLink to="/addpoll">Add Poll</NavLink></li>
							</ul>
							<ul className="nav navbar-nav navbar-right">							
								{!localStorage.getItem('user') && <li><NavLink to="/register" >Register</NavLink></li>}
								{!localStorage.getItem('user') && <li><NavLink to="/login" >Sign In</NavLink></li>}
								{localStorage.getItem('user') && <li><NavLink to="/logout" >Logout</NavLink></li>}
							</ul>
						</div>
					</div>
				</nav>
				
				{this.props.children}
			</div>
			);
	}
}