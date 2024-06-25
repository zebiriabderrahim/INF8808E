/**
 * Generates an SVG element with the specified width, height, and margin.
 *
 * @param {number} width - The width of the SVG element.
 * @param {number} height - The height of the SVG element.
 * @param {object} margin - The margin object with properties `left`, `right`, `top`, and `bottom`.
 * @returns {object} - The generated SVG element.
 */
export function generateSVG (width, height, margin) {
  return d3.select('.viz7-container')
    .append('svg')
    .attr('class', 'viz7-svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}
