import React, {Component} from 'react';
import * as d3 from 'd3';
import {renderChart, updateChart} from '../d3chart.js'

export default class PollView extends Component{

	constructor(props){
		super(props);		
	}
	
	componentDidMount(){
		renderChart(this.props.data);
	}

	componentDidUpdate(){
		renderChart(this.props.data);
		//updateChart(this.props.data);
	}


	render(){
		let style = {
			flexGrow: 3
		};

		return(
			<div style={style}>
				<h1 className="text-center">{this.props.data.name}</h1>
				<div id="chart">
					<svg></svg>
				</div>
			</div>
			);
	}
}