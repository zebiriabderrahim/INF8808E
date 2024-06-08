import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (colorScale, g) {
  // TODO : Generate the legend
  // For help, see : https://d3-legend.susielu.com/
  const legendGroup = g.append('g')
    .attr('transform', 'translate(51, 120)')
    .attr('font-family', 'Open Sans Condensed')

  const legend = d3Legend.legendColor()
    .title('Légende')
    .shape('circle')
    .scale(colorScale)
    .shapePadding(5)
    .labelOffset(5)
    .titleWidth(100)
    .labelAlign('start')
    .orient('vertical')

  legendGroup.call(legend)
}
