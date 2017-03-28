import React from 'react';
import {render} from 'react-dom';
//import ConfirmPoll from './components/ConfirmPoll.jsx';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import routes from './components/Routes.jsx';


render(
	<Router routes={routes} history={browserHistory} />	
	, document.getElementById("app"));