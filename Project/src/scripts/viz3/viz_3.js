import * as tip from './tooltip'

/**
 * @param {d3.scale} scale - The x scale.
 * @param {Array} data - The data.
 * @param {number} width - The width.
 */
export function updateXScale (scale, data, width) {
  const sortedTeams = data.sort((a, b) => a.AverageGoalsPerPlayerByTeam - b.AverageGoalsPerPlayerByTeam).map(d => d.Team)
  scale.domain(sortedTeams)
    .range([0, width])
    .padding([0.2])
}

/**
 * @param {d3.scale} scale - The y scale.
 * @param {Array} data - The data.
 * @param {number} height - The height.
 */
export function updateYScale (scale, data, height) {
  const max = d3.max(data, d => d.AverageGoalsPerPlayerByTeam)
  scale.domain([0, max])
    .range([height, 0])
}

/**
 * @param {Array} data - The data for the bars.
 * @param {object} color - The color configuration.
 * @param {Function} x - The x scale function.
 * @param {Function} y - The y scale function.
 * @param {object} svg - The SVG container.
 * @param {number} width - The width of the chart.
 * @param {number} height - The height of the chart.
 * @param {object} margin - The margin configuration.
 */
export function drawBars (data, color, x, y, svg, width, height, margin) {
  svg.append('g')
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.Team))
    .attr('y', d => y(d.AverageGoalsPerPlayerByTeam))
    .attr('height', d => height - y(d.AverageGoalsPerPlayerByTeam))
    .attr('width', x.bandwidth())
    .attr('fill', d => d.Team === 'Italy' ? color.Italy : color.default)
    .on('mouseover', tip.tooltip.show)
    .on('mouseout', tip.tooltip.hide)
    .on('mousemove', function (event, d) {
      tip.tooltip.show(d, this)
    })

  svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2.4)
    .attr('y', height + margin.bottom - 20)
    .style('font-weight', 'bold')
    .text('Team')

  svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', -height / 2)
    .attr('y', -margin.right - 10)
    .attr('dy', '1em')
    .attr('transform', 'rotate(-90)')
    .style('font-weight', 'bold')
    .text('Average Goals Per Player')

  svg.call(tip.tooltip)
}
