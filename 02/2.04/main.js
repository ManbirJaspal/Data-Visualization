var svg = d3.select("#chart-area").append("svg")
		.attr("width", 500)
		.attr("height", 400);

var rect = svg.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", 50)
		.attr("height", 50)
		.attr("fill", "blue");

var line = svg.append("line")
		.attr("x1", 100)
		.attr("y1", 10)
		.attr("x2", 170)
		.attr("y2", 60)
		.attr("stroke", "red")
		.attr("stroke-width", "5");

var ellipse = svg.append("ellipse")
		.attr("cx", 250)
		.attr("cy", 25)
		.attr("rx", 15)
		.attr("ry", 25)
		.attr("fill", "black");
