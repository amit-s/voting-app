import * as d3 from 'd3';

const widthChart = 350;
const heightChart = 350;	

export default function renderChart(data){	
	
	let dataset = data.options.map(option=>Object.assign({},{name: option.name, count: option.count}));

	const widthLegend = 300;
	const heightLegend = dataset.length * 25 + 25;

	let w = widthChart;
	let h = heightChart;
	let innerRadius = 80;
	let outerRadius = w/2

	let color = d3.scaleOrdinal(d3.schemeCategory10);
	
	
	let svgChart = d3.select("#chart")
				.select("svg")
				.attr("width", w)
				.attr("height", h);

	svgChart.select("#emptynotify")
		.remove();

	let arc = d3.arc()
				.innerRadius(innerRadius)
				.outerRadius(outerRadius);

	let pie = d3.pie()
				.value(d=>d.count);


	/* ***ENTER*** */
	let arcs = svgChart.selectAll("g.arcs")
					.data(pie(dataset))
					.enter()
					.append("g")
					.attr("class","arcs")
					.attr("transform", `translate(${outerRadius},${outerRadius})`);

		arcs.append("path")
			.attr("d", arc)
			.attr("fill", (d,i)=>color(i));

		

	/* ***UPDATE*** */
		svgChart.selectAll("path")
			.data(pie(dataset))			
			.attr("d", arc)
			.attr("fill", (d,i)=>color(i));

		

	/* ***REMOVE*** */
		svgChart.selectAll("g.arcs")
			.data(pie(dataset))
			.exit()
			.remove();


	/* ***Create Legend *** */
	let svgLegend = d3.select("#legend")
						.select("svg")
						.attr("height", heightLegend)
						.attr("width", widthLegend);

	svgLegend.append("g")
			.attr("class","legend");

	svgLegend.select("g.legend")
			.selectAll("rect")
			.data(dataset)
			.enter()			
			.append("rect")
			.attr("x",0)
			.attr("y", (d,i)=>i*22)
			.attr("width",20)
			.attr("height",20)
			.attr("fill", (d,i)=>color(i));

	svgLegend.select("g.legend")
			.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.text(d=>`${d.name} - ${d.count} ${d.count === 1 ? "vote" : "votes"}`)
			.attr("x", 25)
			.attr("y", (d,i)=>i*22 + 15);

	svgLegend.select("g.legend")
			.attr("transform", "translate(20,20)")




	/* ***Legend Update *** */
	
	svgLegend.select("g.legend")
			.selectAll("text")
			.data(dataset)						
			.text(d=>`${d.name} - ${d.count} ${d.count === 1 ? "vote" : "votes"}`);			
			
}