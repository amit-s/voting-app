import React, {Component} from 'react';
import * as d3 from 'd3';
import renderChart from '../d3chart.js';


export default class PollChart extends Component{

	constructor(props){
		super(props);		
	}	

	componentDidMount(){
		let empty = true;
		this.props.data.options.forEach(function(option){			
			if(option.count != 0){
				empty = false;
			}
		});

		if(!empty){
			renderChart(this.props.data);
		}else{
			/*d3.select("svg")
				.selectAll("*").remove();
			d3.select("svg")
				.attr("width",350)
				.attr("height",350)
				.append("g")
				.attr("id","emptynotify")
				.append("text")				
				.text("No Votes yet...")
				.attr("x", 100)
				.attr("y", 50)	*/		
		}
	}

	shouldComponentUpdate(newProps){
		if(this.props.data.options.length !== newProps.data.options.length){
			return false;
		}
		return true;
	}

	componentDidUpdate(){		
		renderChart(this.props.data);
	}

	render(){
		return(
			<div style={{display:"flex", flexWrap: "wrap", justifyContent: "space-around", alignItems:"center"}}>				
				<div id="chart">
					<svg></svg>					
				</div>
				<div id="legend">
					<svg></svg>					
				</div>
			</div>
			);
	}
}