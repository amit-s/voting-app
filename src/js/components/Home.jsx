import React, {Component} from 'react';
import PollList from './PollList.jsx';
import PollView from './PollView.jsx';



export default class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
			selectedPoll: 0,
			data: []
		};
		this.updateSelectedPoll = this.updateSelectedPoll.bind(this);
		this.updateData = this.updateData.bind(this);		
	}

	updateData(newdata){
		
		let data = this.state.data.map(function(item){
			if(item._id == newdata._id){
				return newdata;
			}else{
				return item;
			}
		});

		let params = `data=${JSON.stringify(newdata)}`;

		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/data', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = function(){
			if(xhr.status == 200){
				console.log('data sent to server');
			}
		};
		xhr.send(params);
		this.setState({data});
	}

	updateSelectedPoll(newPoll){		
		this.setState({
			selectedPoll: newPoll
		});
	}

	componentDidMount(){		
		let xhr = new XMLHttpRequest()
		xhr.open('GET', '/api/data', true);
		xhr.send(null);

		xhr.onload = ()=>{			
			this.setState({data: JSON.parse(xhr.responseText).data});			
		}
	}

	renderHome(){
		let style = {display: "flex"};
		return (<div style={style}>
					<PollList data={this.state.data} updatePoll={this.updateSelectedPoll}/>
					<PollView data={this.state.data[this.state.selectedPoll]} getvote={this.updateData}/>
				</div>);
	}

	render(){
		let style = {display: "flex"};
		
		if(this.state.data.length >= 1){
			return this.renderHome();
		}else{
			return null;
		}
		
	}

}