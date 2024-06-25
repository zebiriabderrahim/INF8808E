/**
 * Draws the legend for the visualization.
 */
export function drawLegend () {
  const legendData = [
    { label: 'Italy', color: '#dd5524' },
    { label: 'Other Teams', color: '#008eaa' }
  ]

  const svg = d3.select('.viz6-svg')
  const legendContainerWidth = 300
  const svgWidth = +svg.attr('width')
  const legendStartX = (svgWidth - legendContainerWidth) / 2

  const legend = svg.append('g')
    .attr('class', 'legend-container')
    .attr('transform', `translate(${legendStartX}, ${20})`)
    .selectAll('.legend')
    .data(legendData)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function (d, i) {
      return 'translate(' + (i * 150) + ', 0)'
    })

  legend.append('circle')
    .attr('cx', 19)
    .attr('cy', 19)
    .attr('r', 9)
    .style('fill', function (d) {
      return d.color
    })

  legend.append('text')
    .attr('x', 40)
    .attr('y', 19)
    .attr('dy', '.35em')
    .text(function (d) {
      return d.label
    })
}
