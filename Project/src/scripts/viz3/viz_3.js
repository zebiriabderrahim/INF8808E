import * as tip from './tooltip'

/**
 * @param scale
 * @param data
 * @param width
 */
export function updateXScale (scale, data, width) {
  const equipes = data.map(d => { return d.Equipe })
  scale.domain(equipes)
    .range([0, width])
    .padding([0.2])
}

/**
 * @param scale
 * @param data
 * @param height
 */
export function updateYScale (scale, data, height) {
  const max = d3.sum(data, d => d.CJ) / 2
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
export function drawBars (data, color, x, y, svg, width, height, margin) {
  const subgroups = data.columns.slice(1)
  const stackedData = d3.stack().keys(subgroups)(data)

  svg.append('g')
    .selectAll('g')
    .data(stackedData)
    .enter().append('g')
    .attr('fill', function (d) { return color(d.key) })
    .attr('id', function (d) { return color(d.key) })
    .selectAll('rect')
    .data(function (d) { return d })
    .enter()
    .append('rect')
    .attr('x', function (d) { return x(d.data.Equipe) })
    .attr('y', function (d) { return y(d[1]) })
    .attr('height', function (d) { return y(d[0]) - y(d[1]) })
    .attr('width', x.bandwidth())
    .on('mouseover', tip.tooltip.show)
    .on('mouseout', tip.tooltip.hide)
    
    svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom-10)
    .text('Équipes')
  
  svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 10)
    .attr('dy', '1em')
    .attr('transform', 'rotate(-90)')
    .text('Nombre de cartons ')
  

  svg.call(tip.tooltip)
}
