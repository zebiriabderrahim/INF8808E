import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  const domain = colorScale.domain().sort()
  colorScale.domain(domain)

  const legend = d3Legend.legendColor()
    .title('Position')
    .shape('path', d3.symbol().type(d3.symbolCircle).size(300)())
    .scale(colorScale)

  g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width + 100}, -20)`)
    .style('font-size', '12px').call(legend)
}

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegendViz1 (colorScale, g, width) {
  g.append('g').attr('id', 'legend').attr('transform', 'translate(' + (width) + ',0)')

  // Get the domain values from the color scale
  var newDomainValues = ['0', '1', '2-3', '4-5', '6-7']
  colorScale.domain(newDomainValues)

  // Create a legend scale with the domain values and a custom label function
  var legend = d3Legend.legendColor()
    .scale(colorScale)
    .title('Number of winners')
    .shape('path', d3.symbol().type(d3.symbolCircle).size(300)())
    .shapeWidth(25)
    .labels(function (d) {
      return newDomainValues[d.i]
    })

  g.select('#legend').call(legend)

  g.select('#legend').call(legend)
}

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegendViz2 (colorScale, g, width) {
  g.append('g').attr('id', 'legend').attr('transform', 'translate(' + (width) + ',0)')

  // Get the domain values from the color scale
  var newDomainValues = ['Lionel Messi', 'Cristiano Ronaldo', 'Marco van Basten', 'Michel Platini', 'Johan Cruyff', 'Ronaldo', 'Karl-Heinz Rummenigge', 'Kevin Keegan', 'Franz Beckenbauer', 'Alfredo Di Stéfano']
  colorScale.domain(newDomainValues)

  // Create a legend scale with the domain values and a custom label function
  var legend = d3Legend.legendColor()
    .scale(colorScale)
    .title('Players')
    .shape('line')
    .shapeWidth(25)
    .labels(function (d) {
      return newDomainValues[d.i]
    })

  g.select('#legend').call(legend)

  g.select('#legend').call(legend)
}
