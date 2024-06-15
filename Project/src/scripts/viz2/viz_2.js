
/**
 * @param scale
 * @param data
 * @param width
 */
export function updateGroupXScale (scale, data, width) {
  const domainArray = data.map(d => d['Équipe'])
  scale.domain(domainArray).range([0, width])
}

/**
 * @param scale
 * @param data
 * @param height
 */
export function updateYScale (scale, data, height) {
  const maxCounts = data.map(d => Math.max(d.Buts, d['Total adversaire']))
  const max = d3.max(maxCounts)
  scale.domain([0, Math.max(20, max)]).range([height, 0])
}

/**
 * @param data
 * @param x
 */
export function createGroups (data, x) {
  d3.select('#graph-g')
    .selectAll('.group')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'group')
    .attr('transform', d => 'translate(' + x(d['Équipe']) + ',0)')
}

/**
 * @param y
 * @param xSubgroup
 * @param goalTypes
 * @param height
 * @param color
 * @param tip
 */
export function drawBars (y, xSubgroup, goalTypes, height, color, tip) {
  d3.selectAll('.group')
    .selectAll('rect')
    .data(d => goalTypes.map(goalType => ({ key: goalType, value: d[goalType], team: d['Équipe'] })))
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('width', xSubgroup.bandwidth())
    .attr('height', d => height - y(d.value))
    .attr('fill', d => color(d.key))
    .attr('x', d => xSubgroup(d.key))
    .attr('y', d => y(d.value))
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}
