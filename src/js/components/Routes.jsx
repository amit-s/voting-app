import React from 'react';
import {IndexRoute, Route} from 'react-router';
import Home from './Home.jsx';
import Welcome from './Welcome.jsx';
//import UserPage from './UserPage.jsx';
import Logout from './Logout.jsx';
import AppContainer from '../containers/AppContainer.jsx';
import LoginContainer from '../containers/LoginContainer.jsx';
import AddUserContainer from '../containers/AddUserContainer.jsx';
import AddPollContainer from '../containers/AddPollContainer.jsx';
import UserPageContainer from '../containers/UserPageContainer.jsx';



module.exports = (
	<Route path="/" component={AppContainer} >
		<IndexRoute component={Welcome} />		
		<Route path ="/addpoll" component={AddPollContainer} />
		<Route path="/register" component={AddUserContainer} />
		<Route path="/login" component={LoginContainer} />
		<Route path="/polls" component={UserPageContainer} />
		<Route path="/:username/polls" component={UserPageContainer} />
		<Route path="/logout" component={Logout} />
	</Route>
);