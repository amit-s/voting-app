import React, {Component, PropTypes} from 'react';


const AddUser = ({submit,change,value,errors})=>{
		return(
			<div>
				{errors && errors.map((error,i)=><div key={i} className="alert alert-danger">{error.msg}</div>)}
				
				<form onSubmit={submit} onChange={change}>
					<div className="form-group">
						<label>Name: </label>
						<input type="text" className="form-control" name="name" value={value.name} />
					</div>
					<div className="form-group">
						<label>Username: </label>
						<input type="text" className="form-control" name="username" value={value.username} />
					</div>
					<div className="form-group">
						<label>Password: </label>
						<input type="password" className="form-control" name="password" id="password" />
					</div>
					<div className="form-group">
						<label>Retype Password: </label>
						<input type="password" className="form-control" name="password2" id="password2" />
					</div>
					<input type="submit" className="btn" value="Create" />
				</form>
			</div>
			);	
}

AddUser.propTypes = {
	submit: PropTypes.func.isRequired,
	change: PropTypes.func.isRequired,
	value: PropTypes.object	
}

export default AddUser;