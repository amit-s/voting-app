import React,{Component} from 'react';
import {browserHistory} from 'react-router';

export default class Logout extends Component{
	render(){
		let xhr = new XMLHttpRequest();
		xhr.open('GET','/logout',true);
		xhr.onload = function(){
			if(xhr.status == 200){				
				localStorage.removeItem('user');
				browserHistory.push('/login');
			}
		};
		xhr.send();

		return null;
	}
}

