import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import AddPoll from '../components/AddPoll.jsx'

export default class AddPollContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			optionCount: 2,
			pollName: "",
			options: {},
			errors: ""
		};
		this.updateOptionCount = this.updateOptionCount.bind(this);
		this.handleChange  = this.handleChange.bind(this);
		this.handleSubmit  = this.handleSubmit.bind(this);
	}

	updateOptionCount(e){		
		let count = this.state.optionCount;

		if(e.target.name === "add"){
			this.setState({
				optionCount: ++count
			});
		}else{
			count--;
			count = count<2 ? 2 : count;

			this.setState({
				optionCount: count
			});
		}		
	}

	handleSubmit(e){
		e.preventDefault();
		let username = this.props.getUsername();		
		let {pollName,options} = this.state;		
		let params = `name=${pollName}`;
		
		for(let option in options){		
			params += `&${option}=${options[option]}`
		}

		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/addpoll', true);		
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.onload = ()=>{
			if(xhr.status === 200){
				browserHistory.push(`/${username}/polls`);
			}else{
				let errors = JSON.parse(xhr.response).errors;
				this.setState({errors});
			}
		};
		xhr.send(params);
	}


	handleChange(e){		
		if(e.target.name === "pollName"){
			this.setState({pollName: e.target.value});
		}else{
			let options = this.state.options;
			options[e.target.name] = e.target.value;
			this.setState({options});
		}
	}

	render(){
		return(
			<AddPoll optionCount={this.state.optionCount} updateOptionCount={this.updateOptionCount} change={this.handleChange} submit={this.handleSubmit} errors={this.state.errors} />
			);
	}
} 