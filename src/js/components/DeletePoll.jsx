import React from 'react';

const DeletePoll = ({handleDelete,pollname})=>(
	<input type="button" className="form-control btn btn-default" value="Delete Poll" onClick={()=>handleDelete(pollname)} />
	);

export default DeletePoll;