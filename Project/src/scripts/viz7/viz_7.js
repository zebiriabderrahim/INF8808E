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
export function updateYScale(scale, data, height) {
  const joueurs = data.map(d => d.Joueur);
  scale.domain(joueurs)
    .range([0, height])
    .padding([0.2]);
}


/**
 * @param data
 * @param color
 * @param x
 * @param y
 * @param svg
 */
export function drawBars (data, color, x, y, svg,width,height,margin) {
  const subgroups = data.columns.slice(1)
  const stackedData = d3.stack().keys(subgroups)(data)

  svg.append('g')
    .selectAll('g')
    .data(stackedData)
    .enter().append('g')
    .attr('fill', function (d) { return color(d.key) })
    .selectAll('rect')
    .data(function (d) { return d })
    .enter()
    .append('rect')
    .attr('y', function (d) { return y(d.data.Joueur) })
    .attr('x', function (d) { return x(d[0]) })
    .attr('height', y.bandwidth())
    .attr('width', function (d) { return x(d[1]) - x(d[0]) })
    .on('mouseover', tip.tooltip.show)
    .on('mouseout', tip.tooltip.hide)

    svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom-10)
    .text('Tirs et buts')
  
  svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 10)
    .attr('dy', '1em')
    .attr('transform', 'rotate(-90)')
    .text('Joueurs')

  svg.call(tip.tooltip)
}
