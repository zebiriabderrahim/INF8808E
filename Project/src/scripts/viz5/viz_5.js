import * as tip from './tooltip'

/**
 * Draws a bar chart using the provided data.
 *
 * @param {Array} data - The data to be visualized in the bar chart.
 * @param {object} svg - The SVG element to append the chart to.
 * @param {number} width - The width of the chart.
 * @param {number} height - The height of the chart.
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
    .style('font-weight', 'bold')

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
    .style('font-weight', 'bold')

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
    .attr('fill', '#dd5524')
    .on('mouseover', function (event, d) {
      tip.tooltip.show(d, this)
    })
    .on('mouseout', tip.tooltip.hide)

  svg.call(tip.tooltip)
}
