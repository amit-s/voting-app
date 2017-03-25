import React from 'react';
import {IndexRoute, Route} from 'react-router';
import Home from './Home.jsx';
import AddPoll from './AddPoll.jsx';
//import AddUser from './AddUser.jsx'
import Login from './Login.jsx';
//import Nav from './Nav.jsx';
import UserPage from './UserPage.jsx';
import Logout from './Logout.jsx';
import AppContainer from '../containers/AppContainer.jsx';
import LoginContainer from '../containers/LoginContainer.jsx';
import AddUserContainer from '../containers/AddUserContainer.jsx';


module.exports = (
	<Route path="/" component={AppContainer} >
		<IndexRoute component={Home} />		
		<Route path ="/addpoll" component={AddPoll} />
		<Route path="/register" component={AddUserContainer} />
		<Route path="/login" component={LoginContainer} />
		<Route path="/user/:username" component={UserPage} />
		<Route path="/logout" component={Logout} />
	</Route>
);