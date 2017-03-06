import * as d3 from 'd3';

const width = 350;
const height = 350;	

export  function renderChart(data){	
	
	let dataset = data.options.map(option=>Object.assign({},{name: option.name, count: option.count}));
	//let categories = data.options.map(item=>item.name);	

	let w = width;
	let h = height;
	let innerRadius = 80;
	let outerRadius = w/2

	let color = d3.scaleOrdinal(d3.schemeCategory20);	
	
	let svg = d3.select("#chart")
				.select("svg")
				.attr("width", w)
				.attr("height", h);

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

		arcs.append("text")
			.attr("transform", d=>`translate(${arc.centroid(d)})`)
			.attr("text-anchor","middle")
			.text(d=>d.data.name);

	/* ***UPDATE*** */
		svg.selectAll("path")
			.data(pie(dataset))			
			.attr("d", arc)
			.attr("fill", (d,i)=>color(i));

		svg.selectAll("text")
			.data(pie(dataset))
			.transition()
			.attr("transform", d=>`translate(${arc.centroid(d)})`)
			.attr("text-anchor","middle")
			.text(d=>d.data.name);

	/* ***REMOVE*** */
		svg.selectAll("g.arcs")
			.data(pie(dataset))
			.exit()
			.remove();
}