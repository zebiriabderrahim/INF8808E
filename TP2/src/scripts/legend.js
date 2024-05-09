/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
export function draw (data, color) {
  // TODO : Generate the legend in the div with class "legend". Each SVG rectangle
  // should have a width and height set to 15.
  // Tip : Append one div per legend element using class "legend-element".
  const legend = d3.select('.legend')
  legend.selectAll('.legend-element').remove()
  const legendElements = legend.selectAll('.legend-element').data(data)
    .enter()
    .append('div')
    .attr('class', 'legend-element')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('margin-right', '10px')
  legendElements.append('svg')
}
