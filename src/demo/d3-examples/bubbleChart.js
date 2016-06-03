var d3 = require('d3');
var flare = require('./flare');
var node = document.createElement('div');

var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select(node).append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var Node = svg.selectAll(".node")
    .data(bubble.nodes(classes(flare))
    .filter(function(d) { return !d.children; }))
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  Node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  Node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); });

  Node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });

// Returns a flattened hierarchy containing all leaf nodes under the flare.
function classes(flare) {
  var classes = [];

  function recurse(name, Node) {
    if (Node.children) Node.children.forEach(function(child) { recurse(Node.name, child); });
    else classes.push({packageName: name, className: Node.name, value: Node.size});
  }

  recurse(null, flare);
  return {children: classes};
}


module.exports = node;
