import * as tip from './tooltip'

/**
 * @param scale
 * @param data
 * @param width
 */
export function updateXScale (scale, data, width) {
  const max = d3.max(data, d => d.TotalAttemptsOnTarget)
  scale.domain([0, max])
    .range([0, width])
}

/**
 * @param scale
 * @param data
 * @param height
 */
export function updateYScale (scale, data, height) {
  const max = d3.max(data, d => d.TotalAttemptsOffTarget)
  scale.domain([0, max])
    .range([height, 0])
}

/**
 * @param data
 * @param color
 * @param x
 * @param y
 * @param svg
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
    .on('mouseover', function(event) {
      d3.select(event.target).attr('r', 7);
      tip.tooltip.show(d, this);
    })
    .on('mouseout', function(event) {
      d3.select(event.target).attr('r', 5);
      tip.tooltip.hide();
    })
    .on('mousemove', function(event, d) {
      tip.tooltip.show(d, this);
    });

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
