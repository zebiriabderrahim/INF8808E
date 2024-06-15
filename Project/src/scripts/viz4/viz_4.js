
/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain (colorScale) {
  colorScale.domain([0, 100])
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 * @param xScale The scale for the x axis
 * @param yScale The scale for the y axis
 * @param colorScale The color scale used to set the rectangles' colors
 */
export function appendRects (data, xScale, yScale, colorScale) {
  const svg = d3.select('#graph-g')
  const groups = svg.selectAll('g:not(.x):not(.y)')
    .data(data)
    .enter()
    .append('g')

  groups.each(function (d) {
    const group = d3.select(this)
    const metrics = Object.keys(data[0]).filter(key => key !== 'Adversaire')
    metrics.forEach(m => {
      group
        .append('rect')
        .attr('class', `${m}-rect`)
        .attr('x', xScale(m))
        .attr('y', yScale(d.Adversaire))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .style('fill', colorScale(d[m]))
    })
  })
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 */
export function updateXScale (xScale, data, width) {
  const domain = Object.keys(data[0]).filter(key => key !== 'Adversaire')
  xScale.domain(domain).range([0, width])
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} opponents The opponents of Morocco
 * @param {number} height The height of the diagram
 */
export function updateYScale (yScale, opponents, height) {
  yScale.domain(opponents).range([0, height])
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
export function drawXAxis (xScale) {
  const axix = d3.select('.x')
  axix.style('font-size', '11px').call(d3.axisTop(xScale))
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawYAxis (yScale, width) {
  // TODO : Draw Y axis
  const axix = d3.select('.y')
  axix.attr('transform', 'translate(' + width + ', 0)')
    .style('font-size', '11px')
    .call(d3.axisRight(yScale))
}

/**
 * After the rectangles have been appended, this function dictates their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {object[]} data The data to be used
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
export function updateRects (xScale, yScale, data, colorScale) {
  const metrics = Object.keys(data[0]).filter(key => key !== 'Adversaire')
  const graph = d3.select('#graph-g')
  const rectangles = graph.selectAll('rect').filter(function () { return metrics.includes(d3.select(this).attr('class').split('-')[0]) })

  rectangles.each(function (d) {
    const rect = d3.select(this)
    const metric = rect.attr('class').split('-')[0]

    rect
      .attr('x', xScale(metric))
      .attr('y', yScale(d.Adversaire))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .style('fill', colorScale(d[metric]))
  })
}
