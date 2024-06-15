import d3Tip from 'd3-tip'

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})

function getContent(d) {
  return d.target.parentNode.getAttribute('fill') === '#3c906c'
    ? `${d.target.__data__.data.Joueur} - Buts: ${d.target.__data__[1] - d.target.__data__[0]}`
    : `${d.target.__data__.data.Joueur} - Tirs: ${d.target.__data__[1] - d.target.__data__[0]}`;
}
