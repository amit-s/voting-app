import React, {Component} from 'react';
import * as d3 from 'd3';
import renderChart from '../d3chart.js'

export default class PollView extends Component{

	constructor(props){
		super(props);

		//this.renderChart = this.renderChart.bind(this);
	}


	/*renderChart(data){

		let dataset = data.options.map(item=>item.count);
		let width = 500;
		let height = 500;
		
		let svg = d3.select("#chart")
					.attr("width", width)
					.attr("height", height);


		
	}*/

	componentDidMount(){
		renderChart(this.props.data)
	}


	render(){
		return(
			<div>
				<h1 className="text-center">Poll View for {this.props.data.name}</h1>
				<div id="chart"></div>
			</div>
			);
	}
}