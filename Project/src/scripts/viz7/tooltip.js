import d3Tip from 'd3-tip'

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})

/**
 * Get the content for the tooltip.
 *
 * @param {object} d - The data object.
 * @returns {string} The tooltip content.
 */
function getContent (d) {
  const accuracy = Math.round((d.target.__data__[1] - d.target.__data__[0]) * 100) / 100
  return `Pass Accuracy: ${accuracy}%`
}
