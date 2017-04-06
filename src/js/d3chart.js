import * as d3 from 'd3';

const width = 350;
const height = 350;	

export default function renderChart(data){	
	
	let dataset = data.options.map(option=>Object.assign({},{name: option.name, count: option.count}));	

	let w = width;
	let h = height;
	let innerRadius = 80;
	let outerRadius = w/2

	let color = d3.scaleOrdinal(d3.schemeCategory10);
	//console.log(color.range());
	
	let svg = d3.select("#chart")
				.select("svg")
				.attr("width", w)
				.attr("height", h);

	svg.select("#emptynotify")
		.remove();

	let arc = d3.arc()
				.innerRadius(innerRadius)
				.outerRadius(outerRadius);

	let pie = d3.pie()
				.value(d=>d.count);


	/* ***ENTER*** */
	let arcs = svg.selectAll("g.arcs")
					.data(pie(dataset))
					.enter()
					.append("g")
					.attr("class","arcs")
					.attr("transform", `translate(${outerRadius},${outerRadius})`);

		arcs.append("path")
			.attr("d", arc)
			.attr("fill", (d,i)=>color(i));

		

	/* ***UPDATE*** */
		svg.selectAll("path")
			.data(pie(dataset))			
			.attr("d", arc)
			.attr("fill", (d,i)=>color(i));

		

	/* ***REMOVE*** */
		svg.selectAll("g.arcs")
			.data(pie(dataset))
			.exit()
			.remove();
}