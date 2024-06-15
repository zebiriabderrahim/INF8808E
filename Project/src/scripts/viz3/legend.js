/**
 *
 */
export function drawLegend () {
  const legendData = [
    { label: 'Carton rouge', color: '#c72527' },
    { label: 'Carton jaune', color: '#d7b442' }
  ]

  const svg = d3.select('.viz3-svg')

  const legend = svg.append('g')
    .attr('class', 'legend-container')
    .selectAll('.legend')
    .data(legendData)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function (d, i) {
      return 'translate(' + (275 + (i * 150)) + ', 0)'
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
