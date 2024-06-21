import d3Tip from 'd3-tip'

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})

function getContent (d) {
  const averageGoals = d.AverageGoalsPerPlayerByTeam !== undefined ? Number(d.AverageGoalsPerPlayerByTeam).toFixed(2) : 'N/A'
  return `${d.Team}: ${averageGoals} Goals per Player`
}
