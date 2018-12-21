
// Corresponds to a Bar Graph, graphing data as given
class BarGraph {
	// data as a map (i.e. {year : count, . . . })
	constructor(id, data) {
		this.svg = d3.select("#" + id);
		update(data) // Plot the data
	}

	update(data) {
		// Clear the plot
		this.svg.selectAll("*").remove();

		let length = Object.keys(dictionary).length

		// Initialize scaling functions
		let x = d3.scaleLinear()
							.domain([d3.min(Object.keys(data)),
											 d3.max(Object.keys(data))])
							.range([30, 485]);

		let y = d3.scaleLinear()
							.domain([d3.min(Object.values(data)),
											 d3.max(Object.values(data))])
							.range([0, 300]);


	}
}


// TODO: Most of this tbh, trying to make classes more obviously modular
