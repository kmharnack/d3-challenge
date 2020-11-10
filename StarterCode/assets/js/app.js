// @TODO: YOUR CODE HERE!
var svgHeight = 960
var svgWidth = 1000

var margin = {
    top: 10,
    bottom: 30
    right: 10
    left: 60
};

var chartWidth = svgWidth - margin.left -margin.right;
var chartHeight = svgHeight -margin.top - margin.bottom

var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

    
