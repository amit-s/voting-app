import * as d3 from 'd3';

export default function renderChart(data){
	

	//let dataset = data.options.map(item=>item.count);
	let dataset = data.options;
	let categories = data.options.map(item=>item.name);
	//console.log(dataset);

	let w = 400;
	let h = 400;
	let innerRadius = 0;
	let outerRadius = w/2

	let color = d3.scaleOrdinal(d3.schemeCategory20);
	
	let svg = d3.select("#chart")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	let arc = d3.arc()
				.innerRadius(innerRadius)
				.outerRadius(outerRadius);

	let pie = d3.pie()
				.value(d=>d.count);

	let arcs = svg.selectAll("g.arcs")
					.data(pie(dataset))
					.enter()
					.append("g")
					.attr("class","arcs")
					.attr("transform", `translate(${outerRadius},${outerRadius})`);

		arcs.append("path")
			.attr("d", arc)
			.attr("fill", (d,i)=>color(i));

		arcs.append("text")
			.attr("transform", d=>`translate(${arc.centroid(d)})`)
			.attr("text-anchor","middle")
			.text(d=>d.data.name);
			
}