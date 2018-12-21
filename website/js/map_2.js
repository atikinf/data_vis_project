function whenDocumentLoaded(action) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", action);
  } else {
    // `DOMContentLoaded` already fired
    main();
  }
}

whenDocumentLoaded(() => {
  let width = 1000, 
  mapRatio = .5, 
  mapRatioAdjuster = 50,
  height = width * mapRatio,
  nyc_center = [-73.893002, 40.705019];


  let projection = d3.geo.mercator().center(nyc_center).translate([width / 2, height / 2]).scale(width * [mapRatio + mapRatioAdjuster]);

  let zoom = d3.behavior.zoom().scaleExtent([1, 7]).on("zoom", zoomed);

  let svg = d3.select("#blood_container").append("svg")
  .attr("width", width)
  .attr("height", height);

  let features = svg.append("g");


  svg.append("rect")
  .attr("class", "overlay")
  .attr("width", width)
  .attr("height", height)
  .call(zoom);



  
  function zoomed() {
    features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }
  
  d3.json("police_precincts.geojson").then(function(error, NYC_MapInfo) {

    // after loading geojson, use d3.geo.centroid to find out 
    // where you need to center your map
    let center = d3.geo.centroid(NYC_MapInfo);
    projection.center(center);

    // now you can create new path function with 
    // correctly centered projection
    let path = d3.geo.path().projection(projection);

    // and finally draw the actual polygons
    features.selectAll("path")
    .data(NYC_MapInfo.features)
    .enter()
    .append("path")
    .attr("d", path);
        console.log("yeet");

d3.csv("felonies.csv").then(function(data) {
      let rows = new Array();
      data.forEach(function(d) {
        rows.append({
          permalink: d.CMPLNT_NUM,
          lat: parseFloat(d.Latitude),
          lng: parseFloat(d.Longitude),
          description : d.OFNS_DESC,
          created_at: moment(d.CMPLNT_FR_DT + ' ' + d.CMPLNT_FR_TM, "MM-DD-YYYY HH:mm:ss").unix()
        });
      });
    });



  let displaySites = function(data) {
    let sites = features.selectAll(".site")
    .data(data, function(d) {
      return d.permalink;
    });

    sites.enter().append("circle")
    .attr("class", "site")
    .attr("cx", function(d) {
      return projection([d.lng, d.lat])[0];
    })
    .attr("cy", function(d) {
      return projection([d.lng, d.lat])[1];
    })
    .attr("r", 0.2)
    .transition().duration(500)
    .attr("r", 1);

    sites.exit()
    .transition().duration(200)
    .attr("r",1)
    .remove();
  };


  let minDateUnix = moment('2018-01-01', "YYYY MM DD").unix();
  let maxDateUnix = moment('2018-12-30', "YYYY MM DD").unix();
  let secondsInDay = 60 * 60 * 24;

  d3.select('#slider3').call(d3.slider()
    .axis(true).min(minDateUnix).max(maxDateUnix).step(secondsInDay)
    .on("slide", function(evt, value) {
      let newData = _(site_data).filter( function(site) {
        return site.created_at < value;
      })
    // console.log("New set size ", newData.length);

    displaySites(newData);
  })
    );

});
});