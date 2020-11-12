//define svg
var svgHeight = 600
var svgWidth = 900

//set margins
var margin = {
    top: 10,
    bottom: 30,
    right: 10,
    left: 60,
};

var chartWidth = svgWidth - margin.left -margin.right;
var chartHeight = svgHeight -margin.top - margin.bottom

//svg wrapper
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//import data
d3.csv("assets/data/data.csv").then(function(stateData) {
    console.log(stateData)
    stateData.forEach(function(data) {
        data.obesity = +data.obesity;
        data.poverty = +data.poverty;

    });

//x axis
var x = d3.scaleLinear()
    .domain([7, d3.max(stateData, d => d.poverty) +1])
    .range([0, chartWidth]);

//y axis
var y = d3.scaleLinear()
    .domain([3, d3.max(stateData, d => d.obesity)+1])
    .range([chartHeight, 0])

//scale
var bottomAxis = d3.axisBottom(x);
var leftAxis = d3.axisLeft(y);

// set x to the bottom of the chart
  chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);

// set y to the y axis
chartGroup.append("g")
  .call(leftAxis);

var circleGroup = chartGroup.selectAll("circle")
  .data(stateData)
  .enter()
  .append("circle")
  .attr("cx", d => x(d.poverty))
  .attr("cy", d => y(d.obesity))
  .attr("r", "15")
  .attr("fill", "blue")
  .classed("stateCircle", true)
 
  chartGroup.selectAll()
  .data(stateData)
  .enter()
  .append("text")
  .attr("x", d => x(d.poverty))
  .attr("y", d => y(d.obesity))
  .text(d => d.abbr)
  .attr("r", "15")
  .attr("fill", "black")
  .classed("stateText", true)
 
//circles
var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
        return (`${d.state} <br> poverty-${d.poverty} <br> obesity- ${d.obesity}`);
    });
circleGroup.call(toolTip)

circleGroup.on("mouseover", function(d){
    toolTip.show(d, this)
});
circleGroup.on("mouseout", function(d){
    toolTip.hide(d)
})
// Create axes labels
chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Obesity");

chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 10})`)
    .attr("class", "axisText")
    .text("Poverty");
  }).catch(function(error) {
    console.log(error);

});
