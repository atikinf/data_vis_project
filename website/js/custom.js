
// Corresponds to a Bar Graph, graphing data as given
class BarGraph {
	// data as a map (i.e. {year : count, . . . })
	constructor(id, data, label, val, title, xlabel, ylabel) {
		console.log(data);
		this.svg = d3.select("#" + id);

		// scales the width by proper amount
 		let width = 800 / data.length;

 		// encodes index information for each bar
 		for (let i in data) {
 			data[i]["i"] = width * i;
 		}

 		var barPadding = 8;

 		let xLabels = new Array();
 		data.forEach(function(d) {
 				d[val] = +d[val];
				xLabels.push(d[label]);
		});

		let x = d3.scaleBand()
			.domain(xLabels)
			.range([0, 800])

		let y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d[val]; })])
            .range([400, 0]);

		var barChart = this.svg.selectAll("rect")
		    .data(data)
		    .enter()
		    .append("rect")
		    .attr("fill", "steelblue")
		    .attr("y", function(d) {
		        return 50 + y(d[val]);
		    })
		    .attr("height", function(d) {
		        return y(0) - y(d[val]);
		    })
		    .attr("width", width - barPadding)
		    .attr("transform", function (d, i) {
		         var translate = [width * i, 0];
		         return "translate("+ translate +")";
		    });

		    var xAxis = d3.axisBottom().scale(x);
		    var yAxis = d3.axisLeft().scale(y);

	    // adds x-axis
	    this.svg.append("g").attr("transform", "translate(0, 450)").call(xAxis);
	    this.svg.append("g").attr("transform", "translate(0, 50)").call(yAxis);

	    // y-axis label
	    this.svg.append("text")
	            .attr("x", 400)             
	            .attr("y", 40)
	            .attr("text-anchor", "middle")  
	            .style("font-size", "24px") 
	            .text(title);

		// x-axis label
		this.svg.append("text")
			.attr("x", 400)             
			.attr("y", 485)
			.attr("text-anchor", "middle")  
			.style("font-size", "14px") 
			.text(xlabel);


		// y-axis label
	  this.svg.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -75)
	      .attr("x", -250)
	      .style("font-size", "14px")
	      .style("text-anchor", "middle")
	      .text(ylabel); 
	}
}

// Corresponds to a horizontal Bar Graph, graphing data as given
class HorizBarGraph {
	// data as a map (i.e. {year : count, . . . })
	constructor(id, data, label, val, title, xlabel, ylabel) {
		console.log(data);
		this.svg = d3.select("#" + id);

		// scales the width by proper amount
 		let height = 400 / data.length;

 		// encodes index information for each bar
 		for (let i in data) {
 			data[i]["i"] = height * i;
 		}

 		var barPadding = 8;

 		let yLabels = new Array();
 		data.forEach(function(d) {
 				d[val] = +d[val];
				yLabels.push(d[label]);
		});


		let x = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d[val]; })])
            .range([0, 800]);

   		let y = d3.scaleBand()
			.domain(yLabels)
			.range([0, 400])

		let barChart = this.svg.selectAll("rect")
		    .data(data)
		    .enter()
		    .append("rect")
		    .attr("fill", "steelblue")
		    .attr("x", function(d) {
		        return 0;
		    })
		    .attr("height", height - barPadding)
		    .attr("width", function(d) {
		        return x(d[val]);
		    })
		    .attr("transform", function (d, i) {
		         var translate = [0, 400 - height * i];
		         return "translate("+ translate +")";
		    });

		    var xAxis = d3.axisBottom().scale(x);
		    var yAxis = d3.axisLeft().scale(y);

	    // adds x-axis
	    this.svg.append("g").attr("transform", "translate(0, 450)").call(xAxis);
	    this.svg.append("g").attr("transform", "translate(0, 50)").call(yAxis);

	    // y-axis label
	    this.svg.append("text")
	            .attr("x", 400)             
	            .attr("y", 40)
	            .attr("text-anchor", "middle")  
	            .style("font-size", "24px") 
	            .text(title);

		// x-axis label
		this.svg.append("text")
			.attr("x", 400)             
			.attr("y", 485)
			.attr("text-anchor", "middle")  
			.style("font-size", "14px") 
			.text(xlabel);


		// y-axis label
	  this.svg.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -75)
	      .attr("x", -250)
	      .style("font-size", "14px")
	      .style("text-anchor", "middle")
	      .text(ylabel); 
	}
}

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		main();
	}
}

whenDocumentLoaded(() => {
	// creates map
	d3.csv("data/years.csv").then(function (data) {
		const plot = new BarGraph("vis_A", data, "Year", "count", "Number of Crimes per Year", "Year", "Number of Crimes Committed");
	});
	d3.csv("data/borough_counts.csv").then(function (data) {
		const plot = new BarGraph("vis_B", data, "BORO_NM", "count", "Number of Crimes per Borough", "Borough", "Number of Crimes Committed");
	});
	d3.csv("data/month_counts.csv").then(function (data) {
		const plot = new HorizBarGraph("vis_C", data, "Month", "count", "Number of Crimes per Month", "Month", "Number of Crimes Committed");
	});
	// plot object is global, you can inspect it in the dev-console
});