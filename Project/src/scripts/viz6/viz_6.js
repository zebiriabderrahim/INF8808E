import * as tip from './tooltip'

/**
 * Updates the x-scale of a chart based on the provided data and width.
 *
 * @param {d3.scale} scale - The x-scale to be updated.
 * @param {Array} data - The data used to calculate the maximum value for the x-scale.
 * @param {number} width - The width of the chart.
 */
export function updateXScale (scale, data, width) {
  const max = d3.max(data, d => d.TotalAttemptsOnTarget)
  scale.domain([0, max])
    .range([0, width])
}

/**
 * Updates the y-scale of a chart based on the provided data and height.
 *
 * @param {d3.scale} scale - The y-scale to be updated.
 * @param {Array} data - The data used to calculate the maximum value for the y-scale.
 * @param {number} height - The height of the chart.
 */
export function updateYScale (scale, data, height) {
  const max = d3.max(data, d => d.TotalAttemptsOffTarget)
  scale.domain([0, max])
    .range([height, 0])
}

/**
 * Draws a scatter plot using the provided data.
 *
 * @param {Array} data - The data to be plotted.
 * @param {object} color - The color scheme for the plot.
 * @param {Function} x - The x-axis scale function.
 * @param {Function} y - The y-axis scale function.
 * @param {object} svg - The SVG container for the plot.
 * @param {number} width - The width of the plot.
 * @param {number} height - The height of the plot.
 * @param {object} margin - The margin around the plot.
 */
export function drawScatterPlot (data, color, x, y, svg, width, height, margin) {
  svg.selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => x(d.TotalAttemptsOnTarget))
    .attr('cy', d => y(d.TotalAttemptsOffTarget))
    .attr('r', 5)
    .style('fill', d => d.TeamName === 'Italy' ? color.Italy : color.default)
    .on('mouseover', function (event, d) {
      d3.select(event.target).attr('r', 7)
      tip.tooltip.show(d, this)
    })
    .on('mouseout', function (event) {
      d3.select(event.target).attr('r', 5)
      tip.tooltip.hide()
    })
    .on('mousemove', function (event, d) {
      tip.tooltip.show(d, this)
    })

  svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom - 20)
    .style('font-weight', 'bold')
    .text('Total Attempts On Target')
  svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 20)
    .attr('dy', '1em')
    .attr('transform', 'rotate(-90)')
    .style('font-weight', 'bold')
    .text('Total Attempts Off Target')

  svg.call(tip.tooltip)
}
