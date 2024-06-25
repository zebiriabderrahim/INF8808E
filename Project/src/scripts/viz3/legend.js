/**
 * Draws a legend for the visualization.
 */
export function drawLegend () {
  const legendData = [
    { label: 'Italy', color: '#dd5524' },
    { label: 'Other Teams', color: '#008eaa' }
  ]

  const svg = d3.select('.viz3-svg')
  const legendContainerWidth = 300
  const svgWidth = +svg.attr('width')
  const legendStartX = (svgWidth - legendContainerWidth) / 2

  const legend = svg.append('g')
    .attr('class', 'legend-container')
    .attr('transform', `translate(${legendStartX}, 0)`)
    .selectAll('.legend')
    .data(legendData)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function (d, i) {
      return 'translate(' + (i * 150) + ', 0)'
    })

  legend.append('rect')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 18)
    .attr('height', 18)
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
