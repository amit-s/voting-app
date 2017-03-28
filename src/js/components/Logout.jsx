import React from 'react';
import {browserHistory} from 'react-router';

const Logout = ({updateAuth})=>{	
	let xhr = new XMLHttpRequest();
		xhr.open('GET','/logout',true);
		xhr.onload = function(){
			if(xhr.status == 200){				
				updateAuth(false);
				browserHistory.push('/login');
			}
		};
		xhr.send();

	return null;
}
export default Logout;