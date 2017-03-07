import React, {Component} from 'react';
import * as d3 from 'd3';
import renderChart from '../d3chart.js';
import PollVote from './PollVote.jsx';

export default class PollView extends Component{

	constructor(props){
		super(props);
		//console.log(props);
	}
	
	componentDidMount(){
		renderChart(this.props.data);
	}

	componentDidUpdate(){
		let empty = true;
		this.props.data.options.forEach(function(option){			
			if(option.count != 0){
				empty = false;
			}
		});

		if(!empty){
			renderChart(this.props.data);			
		}else{
			d3.select("svg")
				.selectAll("*").remove();
			d3.select("svg")
				.append("g")
				.attr("id","emptynotify")
				.append("text")				
				.text("Database empty...")
				.attr("x", 100)
				.attr("y", 100)			
		}
	}

	render(){
		let style = {
			container: {
				flexGrow: 3,
				display: "flex",
				flexDirection: "column"
			},
			chart: {
				margin: "auto"
			}
		};

		return(
			<div style={style.container}>
				<h1 className="text-center">{this.props.data.name}</h1>
				<div id="chart" style={style.chart}>
					<svg></svg>
					<PollVote getvote={this.props.getvote} data={this.props.data}/>
				</div>
			</div>
			);
	}
}