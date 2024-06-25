import d3Tip from 'd3-tip'

/**
 * Get the content for the tooltip.
 *
 * @param {object} d - The data object.
 * @returns {string} - The tooltip content.
 */
function getContent (d) {
  const averageGoals = d.AverageGoalsPerPlayerByTeam !== undefined ? Number(d.AverageGoalsPerPlayerByTeam).toFixed(2) : 'N/A'
  return `${d.Team}: ${averageGoals} Goals per Player`
}

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})
