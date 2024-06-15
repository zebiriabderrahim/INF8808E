import { getContentsViz3, getContentsViz4, getContentsViz4Bar } from './tooltip'

/**
 * Viz 3:
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {string} id The id of the graph
 * @param {*} rScale The scale for the circles' radius
 * @param {*} colorScale The scale for the circles' color
 */
export function drawCircles (data, id, rScale, colorScale) {
  d3.select(id).append('g').attr('id', 'circles')

  d3.select('#circles')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('r', d => rScale(d.games))
    .attr('fill', d => colorScale(d.position))
    .style('opacity', 0.7)
}

/**
 * Viz 3:
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {
  g.select('.x.axis-text')
    .attr('x', width / 2)
    .attr('y', height + 40)

  g.select('.y.axis-text')
    .attr('x', -40)
    .attr('y', height / 2)
}

/**
 * Viz 3:
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setHoverHandlerViz3 (tip) {
  const circles = d3.select('#circles').selectAll('circle')

  circles.on('mouseover', (event, data) => {
    const circle = d3.select(data)._groups[0][0]
    const content = getContentsViz3(circle)

    d3.select(event.currentTarget).style('opacity', 1)
    tip.offsetX = event.offsetX
    tip.offsetY = event.offsetY
    tip.html(content)
    tip.style('left', event.pageX + 'px')
      .style('top', event.pageY + 'px')
      .style('font-weight', 300)
      .show(data, event.currentTarget)
  })

  circles.on('mouseout', (event) => {
    d3.select(event.currentTarget).style('opacity', 0.7)
    tip.hide()
  })
}

/**
 * Viz 4 - scatter:
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setHoverHandlerViz4 (tip) {
  const circles = d3.select('#scatterplot').selectAll('circle')

  circles.on('mouseover', (event, data) => {
    const scatter = d3.select(data)._groups[0][0]
    const content = getContentsViz4(scatter)

    d3.select(event.currentTarget).style('opacity', 1)
    tip.offsetX = event.offsetX
    tip.offsetY = event.offsetY
    tip.html(content)
    tip.style('left', event.pageX + 'px')
      .style('top', event.pageY + 'px')
      .style('font-weight', 300)
      .show(data, event.currentTarget)
  })

  circles.on('mouseout', (event) => {
    d3.select(event.currentTarget).style('opacity', 0.7)
    tip.hide()
  })
}

/**
 * Viz 4 - bar:
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setHoverHandlerViz4Bar (tip) {
  const rects = d3.select('#bars').selectAll('rect')

  rects.on('mouseover', (event, data) => {
    const content = getContentsViz4Bar(data)

    d3.select(event.currentTarget).style('opacity', 1)
    tip.offsetX = event.offsetX
    tip.offsetY = event.offsetY
    tip.html(content)
    tip.style('left', event.pageX + 'px')
      .style('top', event.pageY + 'px')
      .style('font-weight', 300)
      .show(data, event.currentTarget)
  })

  rects.on('mouseout', (event) => {
    d3.select(event.currentTarget).style('opacity', 0.7)
    tip.hide()
  })
}

/**
 * Viz 3:
 * Updates the position of the circles based on their bound data. The position
 * transitions gradually.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 * @param {number} transitionDuration The duration of the transition
 */
export function moveCirclesViz3 (g, xScale, yScale, transitionDuration) {
  const circles = g.selectAll('#circles circle')

  circles.transition()
    .duration(transitionDuration)
    .attr('cx', d => xScale(d.year))
    .attr('cy', d => yScale(d.minutes))
}

/**
 * Update the title of the graph.
 *
 * @param {string} id The id of the graph
 * @param {string} text The text of the title
 */
export function setTitleText (id, text) {
  d3.select(id)
    .selectAll('.title')
    .text(text)
}

/**
 * Viz 4 - scatter:
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {string} id The id of the graph
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 */
export function drawData (data, id, xScale, yScale) {
  // create a new SVG group for the lines and a new for the circles
  d3.select(id).append('g').attr('id', 'lines')
  d3.select(id).append('g').attr('id', 'scatterplot')

  // draw the circles
  d3.select('#scatterplot')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('r', 5)
    .attr('fill', 'steelblue')
    .style('opacity', 0.7)

  // draw the lines
  const lines = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.age))
    .curve(d3.curveLinear)

  // remove the old path
  const oldLines = d3.select(id).selectAll('#lines path')
  oldLines.remove()

  d3.select('#lines')
    .append('path')
    .datum(data)
    .attr('d', lines)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .style('opacity', 0.5)
}

/**
 * Viz 4 - scatter:
 * Updates the position of the circles based on their bound data. The position
 * transitions gradually.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 * @param {number} transitionDuration The duration of the transition
 */
export function moveCirclesViz4 (g, xScale, yScale, transitionDuration) {
  const circles = g.selectAll('#scatterplot circle')
  const lines = g.selectAll('#lines path')

  circles.transition()
    .duration(transitionDuration)
    .attr('cx', d => xScale(d.year))
    .attr('cy', d => yScale(d.age))

  lines.transition()
    .duration(transitionDuration)
    .attr('d', d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.age))
      .curve(d3.curveLinear)
    )
}

/**
 * Viz 4 - Bar:
 * Draws the circles on the graph.
 *
 * @param {object} data The data {age, count}
 * @param {string} id The id of the graph
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 */
export function drawBar (data, id, xScale, yScale) {
  const countArray = data.map((d) => d.count)
  const ageArray = data.map((d) => d.age)

  // create a new SVG group for the bars
  d3.select(id).append('g').attr('id', 'bars')

  d3.select('#bars')
    .selectAll('rect')
    .data(countArray)
    .join('rect')
    .attr('x', xScale(0))
    .attr('y', (d, i) => yScale(ageArray[i]))
    .attr('width', d => xScale(d) - xScale(0))
    .attr('height', yScale.bandwidth())
    .attr('fill', 'steelblue')
    .style('opacity', 0.7)
}

/**
 * Viz 2:
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setLinesHoverHandler (tip) {
  d3.selectAll('.line')
    .on('mouseover', function (d, i) {
      tip.show(d, this)
    })
    .on('mouseout', function (d, i) {
      tip.hide()
    })
}

/**
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {*} player Player
 * @param {*} colorScale The scale for the circles' color
 * @param {*} tip Tooltip
 */
export function drawLines (data, player, colorScale, tip) {
  const line = d3.line()
    .x(function (d) { return d.x })
    .y(function (d) { return d.y })

  // Append the line to the graph
  d3.select('#viz2')
    .append('svg')
    .append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', colorScale)
    .attr('stroke-width', 5)
    .on('mouseover', function (d) {
      tip.show(player, this)
    })
    .on('mouseout', function (d) {
      tip.hide()
    })
}
