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
		//this.renderHome = this.renderHome.bind(this);
		//this.renderBlankHome = this.renderBlankHome.bind(this);
		
	}

	updateData(newdata){
		//console.log(newdata);
		let temp = this.state.data.map(function(item){
			if(item._id == newdata._id){
				return newdata;
			}else{
				return item;
			}
		});
		this.setState({data: temp});
	}

	updateSelectedPoll(newPoll){		
		this.setState({
			selectedPoll: newPoll
		});
	}

	componentWillMount(){
		//console.log('here will mount');
		let xhr = new XMLHttpRequest()
		xhr.open('GET', '/api/data', true);
		xhr.send(null);

		xhr.onload = ()=>{
			
			//console.log(JSON.parse(xhr.responseText).data);
			this.setState({data: JSON.parse(xhr.responseText).data});
			//this.data = JSON.parse(xhr.responseText).data;
			
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
		//console.log(this.state.data);
		if(this.state.data.length > 1){
			return this.renderHome();
		}else{
			return null;
		}
		
	}

}