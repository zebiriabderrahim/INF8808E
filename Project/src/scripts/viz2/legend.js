
/**
 * @param data
 * @param color
 */
export function draw (data, color) {
  data.forEach((goalType) => 
    d3.select(".viz2-legend")
      .append("div")
      .attr("class", "legend-element")
      .style("display", "flex")
      .style("flex-direction", "row")
  )

  d3.selectAll(".legend-element").data(data)
    .append("svg").attr("width", 15).attr("height", 15)
    .append("rect").attr("width", 15).attr("height", 15).attr("fill", function(d){return color(d)})
  
  d3.selectAll(".legend-element").data(data)
    .append("span").style("padding-left", "10px").text(function(d){ return d === 'Buts' ? 'Marqués' : 'Encaissés '})
}
