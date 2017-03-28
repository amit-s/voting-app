import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import NavLink from './NavLink.jsx';

const Nav = ({isUserAuthenticated,username})=>(
	<div>
		<nav className="navbar navbar-default">
			<div className="container-fluid">
			
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="navbar-collapse-menu" aria-expanded="false">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="navbar-brand" href="/">Voting App</a>
				</div>
				<div className="collapse navbar-collapse" id="navbar-collapse-menu">
					<ul className="nav navbar-nav">
						{!isUserAuthenticated && <li><NavLink to="/polls" >Polls</NavLink></li>}
						{isUserAuthenticated && <li><NavLink to="/addpoll" >Add Poll</NavLink></li>}
						{isUserAuthenticated && <li><NavLink to={`/${username}/polls`} >My Polls</NavLink></li>}
					</ul>
					<ul className="nav navbar-nav navbar-right">
						{!isUserAuthenticated && <li><NavLink to="/register" >Register</NavLink></li>}
						{!isUserAuthenticated && <li><NavLink to="/login" >Sign In</NavLink></li>}
						{isUserAuthenticated && <li><NavLink to="/logout" >Logout</NavLink></li>}

					</ul>
				</div>
			</div>
		</nav>
	</div>
)

Nav.propTypes = {
	isUserAuthenticated: PropTypes.bool.isRequired
};

export default Nav;