/**
 * Initializes the definition for the gradient to use with the given colorScale.
 *
 * @param {*} colorScale The color scale to use
 */
export function initGradient (colorScale) {
  const svg = d3.select('.viz4-svg')
  const defs = svg.append('defs')

  const linearGradient = defs
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', 0).attr('y1', 1).attr('x2', 0).attr('y2', 0)

  linearGradient.selectAll('stop')
    .data(colorScale.ticks().map((tick, i, nodes) => (
      {
        offset: `${100 * (i / nodes.length)}%`,
        color: colorScale(tick)
      })))
    .join('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color)
}

/**
 * Initializes the SVG rectangle for the legend.
 */
export function initLegendBar () {
  const svg = d3.select('.viz4-svg')
  svg.append('rect').attr('class', 'legend bar')
}

/**
 *  Initializes the group for the legend's axis.
 */
export function initLegendAxis () {
  const svg = d3.select('.viz4-svg')
  svg
    .append('g')
    .attr('class', 'legend axis')
}

/**
 * Draws the legend to the left of the graphic.
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {number} width The width of the legend
 * @param {string} fill The fill of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
export function draw (x, y, height, width, fill, colorScale) {
  const legendBar = d3.select('.legend.bar')
  const legendAxis = d3.select('.legend.axis')

  const axisScale = d3.scaleLinear()
    .domain(colorScale.domain())
    .range([height, 0])

  const axis = d3.axisLeft(axisScale).ticks(7)

  legendBar.attr('x', x)
    .attr('y', y)
    .attr('width', width)
    .attr('height', height)
    .attr('fill', fill)

  legendAxis.attr('transform', `translate(${x},${y})`)
    .call(axis)
}
