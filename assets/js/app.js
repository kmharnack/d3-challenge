//define svg
var svgHeight = 960
var svgWidth = 1000

//set margins
var margin = {
    top: 10,
    bottom: 30
    right: 10
    left: 60
};

var chartWidth = svgWidth - margin.left -margin.right;
var chartHeight = svgHeight -margin.top - margin.bottom

//svg wrapper
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

var chartGroup = svg.append("g")
    .attr("transform,", `translate(${margin.left}, ${margin.top})`);

//import data
d3.csv("data.csv").then(function(stateData) {
    stateData.forEach(function(data) {
        data.obesity = +data.obesity;
        data.poverty = +data.poverty;
    });

//x axis
var x = d3.scaleLinear()
    .domain([7, d3.max(stateData, d => d.poverty) +1])
    .range([0, width]);

//y axis
var y = d3.scaleLinear()
    .domain([3, d3.max(stateData, d => d.obesity)+1])
    .range([height, 0])

//scale
var bottomAxis = d3.axisBottom(x);
var leftAxis = d3.axisLeft(y);

// set x to the bottom of the chart
  chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

// set y to the y axis
chartGroup.append("g")
  .call(yAxis);

chartGroup.selectAll("circle")
  .data(stateData)
  .enter()
  .append("circle")
  .attr("x", (d, i) => xScale(dataCategories[i]))
  .attr("y", d => yScale(d))
  .attr("width", xScale.bandwidth())
  .attr("height", d => chartHeight - yScale(d))
  .attr("fill", "blue");
 
}
})
