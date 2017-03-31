import React from 'react';

const AddPollOption = ({handleChange,handleAddOption})=>(
	<div className="input-group">
		<input className="form-control" type="text" placeholder="Add a poll option..." onChange={handleChange} />		
		<span className="input-group-btn">
			<input type="button" className="form-control btn btn-default" value="Add" onClick={handleAddOption} />
		</span>		
	</div>
	);

export default AddPollOption;