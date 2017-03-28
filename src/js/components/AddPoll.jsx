import React from 'react';

const AddPoll = ({optionCount,updateOptionCount,change,submit,errors})=>{

	let options = [];
	for(let i=0; i<optionCount; i++){
		options.push(<input type="text" className="form-control" name={`option${i}`} key={i} />);
	}

	return (		
		<div>
			{errors && errors.map( (error,i)=><div className="alert alert-danger" key={i}>{error.msg}</div> )}
			<h1>Create a Poll</h1>
			<form onSubmit={submit} onChange={change}>
				<div className="form-group">
					<label>Poll Name: </label>
					<input className="form-control" type="text" name="pollName" />
				</div>
				<div className="form-group">
					<label>Options:</label>
					{options}
				</div>
				<div className="form-group">
					<input type="button" className="btn" name="add" value="+" onClick={updateOptionCount} />
					<input type="button" className="btn" name="remove" value="-" onClick={updateOptionCount} />
				</div>
				<input type="submit" className="btn" value="Add Poll" />
			</form>
		</div>
	);
}

export default AddPoll;