import React from 'react';

const PollItem = ({pollData,handleClick,id,hasVoted})=>{
	let date = new Date(pollData.createdTime);
	let style = {
		borderWidth: 1,
		borderColor: 'black',
		borderStyle: 'solid',
		margin: 5,
		padding: 5
	};
	let voteStatus = hasVoted ? "Voted" : "Not voted";

	return(
		<div style={style} onClick={(handleClick)} id={id}>
			<div>{pollData.name} - {voteStatus}</div>
			<div>Total Votes {pollData.options.reduce((total,option)=>(total + option.count),0)}</div>
			<div>Created by {pollData.createdBy} on {date.toLocaleDateString()}</div>
			<div>Created on {date.toLocaleDateString()}</div>			
		</div>
	);
};

export default PollItem;