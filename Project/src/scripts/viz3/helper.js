/**
 * @param width
 * @param height
 * @param margin
 */
export function generateSVG (width, height, margin) {
  return d3.select('.viz3-container')
    .append('svg')
    .attr('class', 'viz3-svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}
