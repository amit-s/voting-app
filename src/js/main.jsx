import React, {Component} from 'react';
import {render} from 'react-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Nav from './components/Nav.jsx';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


render(
	<Router history={browserHistory}>
		<Route path="/" component={Nav} >
			<IndexRoute component={Home} />
			<Route path="/about" component={About} />			
		</Route>
	</Router>
	, document.getElementById("app"));