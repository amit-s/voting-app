import React,{Component} from 'react';
import AddPollOption from '../components/AddPollOption.jsx';

export default class AddPollOptionContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			option : ""
		};
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
	}

	handleFieldChange(e){
		this.setState({option: e.target.value});		
	}

	handleAddOption(){
		let data = JSON.parse(JSON.stringify(this.props.data));
		let newOption = {
			name: this.state.option,
			count: 0
		};
		data.options.push(newOption);		
		this.props.addNewOption(data);
	}

	render(){		
		return <AddPollOption handleChange={this.handleFieldChange} handleAddOption={this.handleAddOption} />;
	}
}
