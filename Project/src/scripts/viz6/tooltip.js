import d3Tip from 'd3-tip'

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})

/**
 * Returns the content for the tooltip.
 *
 * @param {object} d - The data object.
 * @returns {string} The tooltip content.
 */
function getContent (d) {
  const offAttempts = d.TotalAttemptsOffTarget !== undefined ? d.TotalAttemptsOffTarget : 'N/A'
  const onAttempts = d.TotalAttemptsOnTarget !== undefined ? d.TotalAttemptsOnTarget : 'N/A'
  return `${d.TeamName}:<br>${offAttempts} Total Attempts Off Target<br>${onAttempts} Total Attempts On Target`
}
