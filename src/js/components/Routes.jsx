import React from 'react';
import {IndexRoute, Route} from 'react-router';
import Home from './Home.jsx';
import About from './About.jsx';
import AddPoll from './AddPoll.jsx';
import AddUser from './AddUser.jsx'
import Login from './Login.jsx';
import Nav from './Nav.jsx';

module.exports = (
	<Route path="/" component={Nav} >
		<IndexRoute component={Home} />
		<Route path="/about" component={About} />
		<Route path ="/addpoll" component={AddPoll} />
		<Route path="/register" component={AddUser} />
		<Route path="/login" component={Login} />
	</Route>
);