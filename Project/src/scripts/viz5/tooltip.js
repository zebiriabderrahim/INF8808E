import d3Tip from 'd3-tip'

const labelMapping = {
  'Arrêts': 'Arrêts',
  'Gagnés': 'Duels aériens gagnés',
  'Tcl': 'Dribbleurs Taclés',
  'Possession': 'Possession',
  'Cmp': 'Passes réussies',
};


export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})

function getContent(d) {
  const color = d.team === 'Total Maroc' ? '#3c906c' : '#c72527';
  
  return `
    <svg width="12" height="12">
      <rect width="12" height="12" style="fill:${color};"></rect>
    </svg>
    ${d.team} - ${labelMapping[d.label]}: ${d.value}%
  `;

  
}




