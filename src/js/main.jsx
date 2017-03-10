import React, {Component} from 'react';
import {render} from 'react-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import AddPoll from './components/AddPoll.jsx';
import AddUser from './components/AddUser.jsx'
import Nav from './components/Nav.jsx';
import ConfirmPoll from './components/ConfirmPoll.jsx';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


render(
	<Router history={browserHistory}>
		<Route path="/" component={Nav} >
			<IndexRoute component={Home} />
			<Route path="/about" component={About} />
			<Route path ="/addpoll" component={AddPoll} />
			<Route path="/register" component={AddUser} />
		</Route>
	</Router>
	, document.getElementById("app"));