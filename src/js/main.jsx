import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import routes from './components/Routes.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

$(document).on('click','.navbar-collapse.in',function(e) {	
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});


render(
	<Router routes={routes} history={browserHistory} />	
	, document.getElementById("app"));
