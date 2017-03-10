import React, {Component} from 'react';

export default class AddUser extends Component{
	render(){
		return(
			<div>
				<form method="POST" action="">
					<div className="form-group">
						<label>Name: </label>
						<input type="text" className="form-control" name="name" />
					</div>
					<div className="form-group">
						<label>Username: </label>
						<input type="text" className="form-control" name="username" />
					</div>
					<div className="form-group">
						<label>Password: </label>
						<input type="text" className="form-control" name="password" />
					</div>
					<div className="form-group">
						<label>Retype Password: </label>
						<input type="text" className="form-control" name="password2" />
					</div>
					<input type="submit" className="btn" value="Create" />
				</form>
			</div>
			);
	}
}