import * as tip from './tooltip'

/**
 * @param data
 * @param svg
 * @param width
 * @param height
 */
export function drawBarChart (data, svg, width, height) {
  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.Event))
    .range([0, height])
    .padding(0.1)

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.Frequency) * 1.4])
    .nice()
    .range([0, width])

  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('class', 'axis-label')

  svg
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', width / 2 - 30)
    .attr('y', height + 41)
    .attr('text-anchor', 'middle')
    .text('Count')

  svg
    .append('g')
    .call(d3.axisLeft(y))
    .selectAll('text')
    .attr('class', 'axis-label')

  svg
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', -height / 2)
    .attr('y', -120)
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Event')

  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('y', (d) => y(d.Event))
    .attr('x', 0)
    .attr('width', (d) => x(d.Frequency))
    .attr('height', y.bandwidth())
    .attr('fill', '#1c9caf')
    .on('mouseover', function (event, d) {
      tip.tooltip.show(d, this)
    })
    .on('mouseout', tip.tooltip.hide)

  svg.call(tip.tooltip)
}
