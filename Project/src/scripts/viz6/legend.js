const width = 300
const margin = { top: 50, right: 70, bottom: 50, left: 100 }
const graphWidth = width - margin.left - margin.right + 150

/**
 * @param svg
 * @param colorScale
 */
export function drawLegend (svg, colorScale) {
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(' + (margin.left + graphWidth - 10) + ',' + (margin.top + 20) + ')')

  legend.selectAll('.legend-item')
    .data(colorScale.domain())
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', function (d, i) { return 'translate(' + i * 200 + ', 0)' })
    .each(function (d) {
      const item = d3.select(this)
      item.append('rect')
        .attr('x', 30)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', colorScale(d))
      item.append('text')
        .attr('x', 70)
        .attr('y', 9)
        .attr('dy', '0.35em')
        .text(d)
    })
}
