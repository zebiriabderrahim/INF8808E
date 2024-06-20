
/**
 * @param margin
 */
export function generateG (margin) {
  return d3.select('.viz2-graph')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * @param g
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x axis')

  g.append('g')
    .attr('class', 'y axis')
}

/**
 * @param g
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Nombre de buts')
    .attr('class', 'y axis-text')
    .attr('transform', 'rotate(-90)')
    .attr('font-family', 'Roboto Slab')
    .attr('font-size', '12px')

  g.append('text')
    .text('Équipe')
    .attr('class', 'title')
    .attr('fill', '#898989')
}

/**
 * @param colors
 * @param players
 */
export function defineColorScale (colors, players) {
  return d3.scaleOrdinal().range(colors).domain(players)
}

/**
 * @param width
 * @param height
 */
export function setCanvasSize (width, height) {
  d3.select('#viz2-bar-chart').select('svg')
    .attr('width', width)
    .attr('height', height)
}

/**
 * @param width
 * @param height
 */
export function positionLabels (width, height) {
  d3.select('.y.axis-text')
    .attr('x', -50)
    .attr('y', height / 2)

  d3.select('.title')
    .attr('x', width / 2)
    .attr('y', height + 40)
}

/**
 * @param scale
 * @param players
 * @param xScale
 */
export function updateXSubgroupScale (scale, players, xScale) {
  scale
    .domain(players)
    .range([0, xScale.bandwidth()])
}

/**
 * @param xScale
 * @param height
 */
export function drawXAxis (xScale, height) {
  d3.select('.x.axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(xScale)
      .tickFormat(x => `${x}`))
}

/**
 * @param yScale
 */
export function drawYAxis (yScale) {
  d3.select('.y.axis').call(d3.axisLeft(yScale).ticks(5))
}
