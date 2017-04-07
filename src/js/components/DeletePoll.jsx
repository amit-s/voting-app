import React from 'react';

const DeletePoll = ({handleDelete,pollname})=>(
	<div style={{margin: 10}}>
		<input type="button" className="form-control btn btn-default" value="Delete Poll" onClick={()=>handleDelete(pollname)} />
	</div>
	);

export default DeletePoll;