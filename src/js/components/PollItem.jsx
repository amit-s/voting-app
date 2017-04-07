import React from 'react';

const PollItem = ({pollData,handleClick,id,hasVoted})=>{
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
			width: 200
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
	//let voteStatus = hasVoted ? "Voted" : "Not voted";
	//let voteIcon = hasVoted ? <span className='glyphicon glyphicon-ok-circle' ></span> : <span className='glyphicon glyphicon-remove-circle'></span>;
	let voteIcon = hasVoted ? <span className='glyphicon glyphicon-ok' style={style.span} ></span> : "";
	let totalVotes = pollData.options.reduce((total,option)=>(total + option.count),0);
	let leaderObj = pollData.options.sort((a,b)=>b.count-a.count)[0];
	let leaderName = totalVotes === 0 ? "No leader yet" : leaderObj.name;
	let leaderPercentage = totalVotes === 0 ? "" : `(${(leaderObj.count/totalVotes * 100).toFixed(2)}%)`;
	//console.log(leader);

	return(
		<div className="pollitem text-center" style={style.container} onClick={(handleClick)} id={id} >
			{voteIcon}
			<h4 style={style.heading} id={id}>{pollData.name}</h4>
			<div>by {pollData.createdBy} - {date.toLocaleDateString()}</div>
			<br />
			<div>Total Votes {totalVotes}</div>
			<div>Leader - {leaderName} {leaderPercentage}</div>
			
		</div>
	);
};

export default PollItem;