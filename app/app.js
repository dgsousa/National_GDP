coimport * as d3 from 'd3';

(function displayGDP() {
	"use strict";
	var height = 700;
	var width = 1500;
	var padding = 50;
	var months = {
		0: "December",
		3: "March",
		6: "June",
		9: "September"
	}

	var canvas = d3.select('.gdp')
				   .append("svg")
				   .attr("class", "svg")
				   .attr("width", width + padding * 2)
				   .attr("height", height + padding * 2)
				   .attr("border", "1px solid black")
			 	   .append("g")
				   .attr("transform", "translate(" + padding + "," + padding + ")")


	var yScale = d3.scaleLinear()
				   .range([height, 0]);

	var xScale = d3.scaleTime()
				   .range([0, width]);

	var parseTime = d3.timeParse("%Y-%m-%d");

	var xAxis = d3.axisBottom(xScale)
				  .ticks(10)
				  
	var yAxis = d3.axisLeft(yScale)
				  .ticks(10)

	d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(err, response) {
		if(err) {
			console.log(error)
		} else {

			yScale.domain([0, d3.max(response.data, function(d) { return d[1];})])

			var xDomain = d3.extent(response.data, function(d) {
				return parseTime(d[0]);
			})

			xScale.domain(xDomain);

			canvas.append("g")
				  .attr("transform", "translate(0, " + 700 + ")")
				  .call(xAxis)
				  .selectAll("text")
				  .attr("class", "x-text")
				  .attr("dy", ".8em")
				  .attr("dx", "-1.2em")
				  .attr("transform", "rotate(-45)")

			canvas.append("g")
				  .call(yAxis)
				  .append("text")
				  .attr("class", "y-text")
				  .attr("y", 40)
				  .attr("x", -200)
				  .attr("dy", "1em")
				  .attr("transform", "rotate(-90)")
				  .attr("text-anchor", "end")
				  .text("Gross Domestic Product (in billions)")


			canvas.selectAll("rect")
				  .data(response.data)
				  .enter()d.
				  .append("rect")
				  .attr("width", 5)
				  .attr("height", function(d) {
				  	return height - yScale(d[1])
				  })
				  .attr("x", function(d) {
				  	var date = parseTime(d[0])
				  	return xScale(date);
				  })
				  .attr("y", function(d) {
				  	return yScale(d[1]);
				  })
				  .attr("stroke", "black")
				  .on("mouseover", function() {
				  	return tooltip.style("visibility", "visible")
				  })
				  .on("mouseout", function() {
				  	d3.select(this).style("fill", "black")
				  	return tooltip.style("visibility", "hidden")
				  })
				  .on("mousemove", function(d) {
				  	var date = parseTime(d[0])
				  	d3.select(this).style("fill", "blue")
				  	return tooltip.style("top", (event.pageY - 110) + "px").style("left", (event.pageX + 10) + "px")
				  				  .html("<h3>$ " + d[1] + " Billion</h3><br><p>" + date.getFullYear() + " - " + months[date.getMonth()] + "" + "</p>")
				  })

			var tooltip = d3.select("body")
							.append("div")
							.style("position", "absolute")
							.style("z-index", 10)
							.style("visibility", "hidden")
							.style("background", "rgba(255,255,255,.9)")
							.style("width", "150px")
							.style("height", "80px")
							.style("border-radius", "5px")
							.style("border", "2px solid black")
							.style("padding-left", "10px")					
						  		   	  
		}

	})

}())