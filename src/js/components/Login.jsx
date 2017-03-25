import React,{Component, PropTypes} from 'react';

const Login = ({success,error,handleLogin,handleChange})=>(
	<div>	
		{error && <div className="alert alert-danger">{error}</div>}
		{success && <div className="alert alert-success">{success}</div>}
		<form onSubmit={handleLogin}>
			<div className="form-group">
				<label>Username</label>
				<input type="text" className="form-control" name="username" onChange={handleChange} />
			</div>
			<div className="form-group">
				<label>Password</label>
				<input type="password" className="form-control" name="password" onChange={handleChange} />
			</div>
			<input className="btn" type="submit" value="Sign In" />
		</form>
	</div>
	)


Login.propTypes = {
	success: PropTypes.string,
	error: PropTypes.string,
	handleLogin: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired
};

export default Login;
