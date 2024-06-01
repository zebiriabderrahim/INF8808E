import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  // TODO : Draw the legend using d3Legend
  // For help, see : https://d3-legend.susielu.com/
  // use the link above to find the right legend for your color scale and use also the width parameter to place the legend and g
  // const domain = colorScale.domain().sort()
  // colorScale.domain(domain)

  // g.append('g')
  //   .attr('class', 'legend')
  //   .attr('transform', `translate(${width - 100}, 20)`)
  //   .style('font-size', '12px')
  //   .call(d3Legend.legendColor()
  //     .title('Legend')
  //     .shape('path', d3.symbol().type(d3.symbolCircle).size(300)())
  //     .scale(colorScale)
  //   )
  const domain = colorScale.domain().sort()
  colorScale.domain(domain)

  const legend = d3Legend.legendColor()
    .title('Legend')
    .shape('path', d3.symbol().type(d3.symbolCircle).size(300)())
    .scale(colorScale)

  g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width}, -20)`)
    .style('font-size', '12px').call(legend)
}
