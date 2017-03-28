import React,{PropTypes} from 'react';

const PollVote = ({data,getVote})=>(
	<div>
		Vote for : 
		<select name={data.name} onChange={getVote} className="form-control">
		<option value="select">Select...</option>
		{data.options.map((option,i)=><option key={i} value={option.name}>{option.name}</option>)}
		</select>				
	</div>
);

PollVote.propTypes = {
	data: PropTypes.object.isRequired,
	getVote: PropTypes.func.isRequired
};

export default PollVote;