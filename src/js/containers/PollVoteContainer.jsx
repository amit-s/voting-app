import PollVote from '../components/PollVote.jsx';
import React,{Component} from 'react';

export default class PollVoteContainer extends Component{
	constructor(props){
		super(props);
		this.state = {

		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		let selectedOption = e.target.value;
		if(selectedOption === 'select'){
			return;
		}
		let newdata = JSON.parse(JSON.stringify(this.props.data));
		newdata.options.forEach(function(option){
			if(option.name == selectedOption){
				option.count++;
			}
		});		
		this.props.getvote(newdata);
	}

	render(){
		return(
			<PollVote data={this.props.data} getVote={this.handleChange} />
			);
	}
}