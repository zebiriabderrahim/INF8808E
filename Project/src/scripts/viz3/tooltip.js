import d3Tip from 'd3-tip'

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})

function getContent (d) {
  return `${d.Team}: ${d.AverageGoalsPerPlayerByTeam.toFixed(2)} Goals per Player`
}
