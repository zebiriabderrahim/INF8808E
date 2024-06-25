/**
 * Generates an SVG element.
 *
 * @param {number} width - The width of the SVG.
 * @param {number} height - The height of the SVG.
 * @param {object} margin - The margin object.
 * @returns {object} - The generated SVG element.
 */
export function generateSVG (width, height, margin) {
  return d3.select('.viz4-container')
    .append('svg')
    .attr('class', 'viz4-svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Filters outliers from the data.
 *
 * @param {Array} data - The data array.
 * @returns {Array} - The filtered data array.
 */
export function getOultiers (data) {
  const q1 = d3.quantile(data, 0.25)
  const q3 = d3.quantile(data, 0.75)
  const iqr = q3 - q1

  return data.filter(v => v >= q1 - 1.5 * iqr && v <= q3 + 1.5 * iqr)
}
