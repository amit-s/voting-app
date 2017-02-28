import React, {Component} from 'react';
import PollList from './PollList.jsx';
import PollView from './PollView.jsx';

let data = [{
	"name": "Favorite Food",
	"options": [
		{"name" : "pizza", "count":1},
		{"name" : "hot dog", "count":3},
		{"name" : "cheeseburger", "count":5}
	]
},
{
	"name": "Favorite Color",
	"options": [
		{"name" : "blue", "count":1},
		{"name" : "green", "count":3},
		{"name" : "yellow", "count":5}
	]
}];

export default class Home extends Component{
	render(){
		return(
			<div id="homecontainer">
				<PollList data={data}/>
				<PollView />
			</div>
			);
	}
}