import * as tip from './tooltip'

/**
 * @param scale
 * @param data
 * @param width
 */
export function updateXScale (scale, data, width) {
  const max = d3.max(data, d => d3.sum(Object.values(d).slice(1)))
  scale.domain([0, max])
    .range([0, width])
}

/**
 * @param scale
 * @param data
 * @param height
 */
export function updateYScale (scale, data, height) {
  const teams = data.map(d => d.TeamName)
  scale.domain(teams)
    .range([0, height])
    .padding([0.2])
}

/**
 * @param data
 * @param color
 * @param x
 * @param y
 * @param svg
 * @param width
 * @param height
 * @param margin
 */
export function drawBars (data, color, x, y, svg, width, height, margin) {
  const subgroups = data.columns.slice(1)
  const stackedData = d3.stack().keys(subgroups)(data)

  const groups = svg.append('g')
    .selectAll('g')
    .data(stackedData)
    .enter().append('g')
    .attr('fill', d => color.default)

  groups.selectAll('rect')
    .data(d => d)
    .enter().append('rect')
    .attr('y', d => y(d.data.TeamName))
    .attr('x', d => x(d[0]))
    .attr('height', y.bandwidth())
    .attr('width', d => x(d[1]) - x(d[0]))
    .attr('fill', d => d.data.TeamName === 'Italy' ? color.Italy : color.default)
    .on('mouseover', tip.tooltip.show)
    .on('mouseout', tip.tooltip.hide)

  svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', (width / 2) - 10)
    .attr('y', height + margin.bottom - 10)
    .style('font-weight', 'bold')
    .text('Pass Accuracy (%)')

  svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 10)
    .attr('dy', '1em')
    .attr('transform', 'rotate(-90)')
    .style('font-weight', 'bold')
    .text('Team Names')

  svg.call(tip.tooltip)
}
