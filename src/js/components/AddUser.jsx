import React, {Component} from 'react';

export default class AddUser extends Component{
	render(){	
	let errorMessage = "";
	let defaultValue = {
		name: "",
		username: ""
	};

	if(this.props.userdata){
		let errors = this.props.userdata.errors;
		let {name,username} = this.props.userdata.userinfo;
		
		defaultValue.name = name;
		defaultValue.username = username;
		errorMessage = errors.map((error,i)=><div className="alert alert-danger" key={i} defaultValue={error.value}>{error.msg}</div>);
	}	

		return(
			<div>
				{errorMessage}
				<form method="POST" action="/register">
					<div className="form-group">
						<label>Name: </label>
						<input type="text" className="form-control" name="name" defaultValue={defaultValue.name} />
					</div>
					<div className="form-group">
						<label>Username: </label>
						<input type="text" className="form-control" name="username" defaultValue={defaultValue.username} />
					</div>
					<div className="form-group">
						<label>Password: </label>
						<input type="password" className="form-control" name="password" />
					</div>
					<div className="form-group">
						<label>Retype Password: </label>
						<input type="password" className="form-control" name="password2" />
					</div>
					<input type="submit" className="btn" value="Create" />
				</form>
			</div>
			);
	}
}