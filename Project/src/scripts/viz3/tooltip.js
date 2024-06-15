import d3Tip from 'd3-tip'

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})

function getContent (d) {
  return d.target.parentNode.getAttribute('fill') === '#d7b442'
    ? `${d.target.__data__.data.Equipe} - ${d.target.__data__.data.CJ} Cartons jaunes`
    : `${d.target.__data__.data.Equipe} - ${d.target.__data__.data.CR} Carton rouge`;
}
