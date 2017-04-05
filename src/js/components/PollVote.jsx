import React,{PropTypes} from 'react';

const PollVote = ({data,getVote})=>(
	<div>		
		<select name={data.name} onChange={getVote} className="form-control">
		<option value="select">Cast your vote...</option>
		{data.options.map((option,i)=><option key={i} value={option.name}>{option.name}</option>)}
		</select>
	</div>	
);

PollVote.propTypes = {
	data: PropTypes.object.isRequired,
	getVote: PropTypes.func.isRequired
};

export default PollVote;


/*<div className="input-group">
			<input type="text" className="form-control" aria-label="Text input with dropdown button" />
			<div className="input-group-btn">
				<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Vote</button>
				<div className="dropdown-menu dropdown-menu-right">
					{data.options.map((option,i)=><div className="dropdown-item" key={i} value={option.name}>{option.name}</div>)}
				</div>
			</div>
		</div>*/
