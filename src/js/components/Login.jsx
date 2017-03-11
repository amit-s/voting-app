import React, {Component} from 'react';

export default class Login extends Component{

	render(){
	let msgBox;
	if(this.props.msg){
		let success_msg = this.props.msg.success_msg[0];
		msgBox = <div className="alert alert-success">{success_msg}</div>;
	}
	
	
		return(
			<div>
				{msgBox}
				<form method="" action="">
					<div className="form-group">
						<label>Username</label>
						<input type="text" className="form-control" name="name" />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" name="password" />
					</div>
					<input type="submit" value="Submit" />
				</form>
			</div>
			);
	}
}