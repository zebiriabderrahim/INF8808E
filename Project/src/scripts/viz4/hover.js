/**
 * Sets up an event handler for when the mouse enters and leaves the squares in the heatmap.
 *
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 */
export function setRectHandler (xScale, yScale, rectSelected, rectUnselected, selectTicks, unselectTicks) {
  const rectangles = d3.select('#graph-g').selectAll('rect')

  rectangles
    .on('mouseenter', function () {
      const data = d3.select(this.parentNode).datum()
      const selectedColumn = d3.select(this).attr('class').split('-')[0]
      rectSelected(this, xScale, yScale)
      selectTicks(selectedColumn, data.Adversaire)
    })

    .on('mouseleave', function () {
      rectUnselected(this)
      unselectTicks()
    })
}

/**
 * The function to be called when one or many rectangles are in "selected" state (hovered).
 *
 * @param {*} element The selection of rectangles in "selected" state
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 */
export function rectSelected (element, xScale, yScale) {
  const data = d3.select(element).data()[0]
  d3.select(element).style('opacity', 1).transition().style('opacity', 0.80)

  const group = d3.select(element.parentNode)
  const selectedColumn = d3.select(element).attr('class').split('-')[0]
  const selectedValue = data[selectedColumn]
  const fillColor = selectedValue >= 75 ? 'white' : 'black'

  group
    .append('text')
    .text(selectedValue)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Roboto Slab')
    .attr('font-size', '14px')
    .attr('fill', fillColor)
    .attr('x', parseFloat(d3.select(element).attr('x')) + xScale.bandwidth() / 2)
    .attr('y', parseFloat(d3.select(element).attr('y')) + yScale.bandwidth() / 2)
    .style('pointer-events', 'none')
}

/**
 * The function to be called when the rectangle is no longer in "selected state".
 *
 * @param {*} element The selection of rectangles in "selected" state
 */
export function rectUnselected (element) {
  d3.select(element).transition().style('opacity', 1)
  d3.select(element.parentNode).select('text').remove()
}

/**
 * Makes the font weight of the ticks texts with the given metric and opponent bold.
 *
 * @param {string} metric The performance metric associated with the tick text to make bold
 * @param {number} opponent The opponent associated with the tick text to make bold
 */
export function selectTicks (metric, opponent) {
  const yAxis = d3
    .select('.y.axis')
    .selectAll('.tick')
    .filter((d) => d === opponent)
    .select('text')

  const xAxis = d3
    .select('.x.axis')
    .selectAll('.tick')
    .filter((d) => d === metric)
    .select('text')

  yAxis.style('font-weight', 'bold')
  yAxis.style('font-size', '12px')
  xAxis.style('font-weight', 'bold')
  xAxis.style('font-size', '12px')
}

/**
 * Returns the font weight of all ticks to normal.
 */
export function unselectTicks () {
  const axisTicks = d3.selectAll('.axis .tick text')
  axisTicks.style('font-weight', 'normal')
  axisTicks.style('font-size', '11px')
}
