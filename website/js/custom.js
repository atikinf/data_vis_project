// Implements most of the visualizations in overview page

// A Bar Graph, graphing data as given
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

 		let barPadding = 8;

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

		let barChart = this.svg.selectAll("rect")
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
		         let translate = [width * i, 0];
		         return "translate("+ translate +")";
		    });

    let xAxis = d3.axisBottom().scale(x);
    let yAxis = d3.axisLeft().scale(y);

    // adds x-axis
    this.svg.append("g").attr("transform", "translate(0, 450)").call(xAxis);
    this.svg.append("g").attr("transform", "translate(0, 50)").call(yAxis);

    // title
    this.svg.append("text")
            .attr("x", 400)             
            .attr("y", 40)
            .attr("text-anchor", "middle")  
            .style("font-size", "28px") 
            .text(title);

		// x-axis label
		this.svg.append("text")
			.attr("x", 400)             
			.attr("y", 500)
			.attr("text-anchor", "middle")  
			.style("font-size", "18px") 
			.text(xlabel);


		// y-axis label
	  this.svg.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -85)
	      .attr("x", -250)
	      .style("font-size", "18px")
	      .style("text-anchor", "middle")
	      .text(ylabel); 
	}
}

// A horizontal Bar Graph, graphing data as given
class HorizBarGraph {
	// data as a map (i.e. {year : count, . . . })
	constructor(id, data, label, val, title, xlabel, ylabel) {
		console.log(data);
		this.svg = d3.select("#" + id);

		// scales the width by proper amount
 		let height = 400 / data.length;

 		// encodes index information for each bar
 		for (let i in data) {
 			data[i]["i"] = height * i * 40;
 		}

 		let barPadding = 8;

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
		    		let base = 450 - height + barPadding;
		        let translate = [0, base - height * i];
		        return "translate("+ translate +")";
		    });

		// mark ticks 
    let xAxis = d3.axisBottom().scale(x);
    let yAxis = d3.axisLeft().scale(y);

    // adds x-axis
    this.svg.append("g").attr("transform", "translate(0, 450)").call(xAxis);
    // 	''  y-axis
    this.svg.append("g").attr("transform", "translate(0, 50)").call(yAxis);

    // y-axis label
    this.svg.append("text")
            .attr("x", 400)             
            .attr("y", 40)
            .attr("text-anchor", "middle")  
            .style("font-size", "28px") 
            .text(title);

		// x-axis label
		this.svg.append("text")
			.attr("x", 400)             
			.attr("y", 500)
			.attr("text-anchor", "middle")  
			.style("font-size", "18px") 
			.text(xlabel);


		// y-axis label
	  this.svg.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -85)
	      .attr("x", -250)
	      .style("font-size", "18px")
	      .style("text-anchor", "middle")
	      .text(ylabel); 
	}
}

// A Stacked Bar Graph, graphing data as given
class StackedGraph {
	// data as a map (i.e. {year : count, . . . })
	constructor(id, combined, label, val, title, xlabel, ylabel) {
		this.svg = d3.select("#" + id);

		// Stack two data objs
		function stack(a, b) {
			let result = {};
			for (let i in a) {
				result[i] = {};
				result[i]['LAW_CAT_CD'] = a[i]['LAW_CAT_CD'];
				result[i]['Hour'] = a[i]['Hour'];
				result[i]['count'] = +a[i]['count'] + b[i]['count'];
			}
			return result;
		}

		let data1 = combined[0];
		let data2 = stack(combined[0], combined[1]);
		let data3 = stack(data2, combined[2]);

		console.log("data3");
		console.log(data3);
		let max = 0;
		for (let i = 0; i < data3.length; i++) {
			let curr = data3[i]['count'];
			console.log(curr);
			if (data3[i]['count'] > max) {
				max = data3[i]['count'];
			}
		}
		console.log(max);
		
		// scales the width by proper amount
 		let width = 800 / data1.length;

 		// encodes index information for each bar
 		console.log(data1);

 		for (let i in data1) {
 			data1[i]["i"] = width * i;
	 		data2[i]["i"] = width * i;
	 		data3[i]["i"] = width * i;
		}

 		let barPadding = 8;

 		let xLabels = new Array();
 		data1.forEach(function(d) {
			d[val] = +d[val];
			xLabels.push(d[label]);
		});

		let x = d3.scaleBand()
			.domain(xLabels)
			.range([0, 800])
		
	 	console.log('test');

		let y = d3.scaleLinear()
            .domain([0, max])
            .range([400, 0]);
	
		this.svg.selectAll("rect")
		    .data(data1)
		    .enter()
		    .append("rect")
		    .attr("fill", "yellow")
		    .attr("y", function(d) {
		        return 50 + y(d[val]);
		    })
		    .attr("height", function(d) {
		        return y(0) - y(d[val]);
		    })
		    .attr("width", width - barPadding)
		    .attr("transform", function (d, i) {
		         let translate = [width * i, 0];
		         return "translate("+ translate +")";
		    });

    let xAxis = d3.axisBottom().scale(x);
    let yAxis = d3.axisLeft().scale(y);

    // adds x-axis
    this.svg.append("g").attr("transform", "translate(0, 450)").call(xAxis);
    this.svg.append("g").attr("transform", "translate(0, 50)").call(yAxis);

    // title
    this.svg.append("text")
            .attr("x", 400)             
            .attr("y", 40)
            .attr("text-anchor", "middle")  
            .style("font-size", "28px") 
            .text(title);

		// x-axis label
		this.svg.append("text")
			.attr("x", 400)             
			.attr("y", 500)
			.attr("text-anchor", "middle")  
			.style("font-size", "18px") 
			.text(xlabel);


		// y-axis label
	  this.svg.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -85)
	      .attr("x", -250)
	      .style("font-size", "18px")
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
		const plot = new BarGraph("vis_A", data, "Year", "count", 
			"Number of Crimes per Year", "Year", "Number of Crimes Committed");
	});
	d3.csv("data/borough_counts.csv").then(function (data) {
		const plot = new BarGraph("vis_B", data, "BORO_NM", "count", 
			"Number of Crimes per Borough", "Borough", "Number of Crimes Committed");
	});
	d3.csv("data/month_counts.csv").then(function (data) {
		const plot = new HorizBarGraph("vis_C", data, "Month", "count", 
			"Number of Crimes per Month", "Month", "Number of Crimes Committed");
	});
	d3.csv("data/misdemeanors_hour.csv").then(function (data1) {
		d3.csv("data/violations_hour.csv").then(function (data2) {
			d3.csv("data/felonies_hour.csv").then(function (data3) {
				combined = [data1, data2, data3];
				const plot = new StackedGraph("vis_D", combined, "Hour of the Day", "count", 
					"Number of Crimes per Hour of Day", "Hour of Day", "Number of Crimes Comitted");
			}); 
		});
	});
		// constructor(id, combined, label, val, title, xlabel, ylabel) {

	// plot object is global, you can inspect it in the dev-console
});