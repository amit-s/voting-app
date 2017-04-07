import React from 'react';

const PollItem = ({pollData,handleClick,id,hasVoted,totalVotes,leaderObj})=>{
	let date = new Date(pollData.createdTime);
	let style = {
		container: {
			position: "relative",
			borderWidth: 1,
			borderColor: 'black',
			borderStyle: 'solid',
			//backgroundColor: hasVoted? "rgba(0,255,0,0.2)":"rgba(255,0,0,0.2)",
			borderRadius: 5,
			margin: 5,
			padding: 10,
			width: 220
		},
		heading: {
			fontFamily: "Kanit, sans-serif"
		},
		body: {
			
		},
		span: {
			position: "absolute",
			top: 5,
			left: 5
		}
	};
	
	let voteIcon = hasVoted ? <span className='glyphicon glyphicon-ok' style={style.span} ></span> : "";	
	let leaderName = totalVotes === 0 ? "No leader yet" : leaderObj.name;
	let leaderPercentage = totalVotes === 0 ? "" : `(${(leaderObj.count/totalVotes * 100).toFixed(2)}%)`;	

	return(
		/*Hover effect handled in css*/
		<div className="pollitem text-center" style={style.container} onClick={(handleClick)} id={id} >
			{voteIcon}
			<h4 style={style.heading} >{pollData.name}</h4>
			<div><i>by {pollData.createdBy} - {date.toLocaleDateString()}</i></div>
			<br />
			<div style={{fontSize: "1.1em"}}>
				<div>Total Votes {totalVotes}</div>
				<div>Leader - {leaderName} {leaderPercentage}</div>
			</div>
		</div>
	);
};

export default PollItem;