import * as tip from './tooltip'

const labelMapping = {
  'Arrêts': 'Arrêts',
  'Gagnés': 'Duels aériens gagnés',
  'Tcl': 'Dribbleurs Taclés',
  'Possession': 'Possession',
  'Cmp': 'Passes réussies',
};

/**
 * @param height
 * @param width
 * @param ticks
 * @param svg
 * @param valueScale
 * @param tickLabels
 */
export function drawCircles (height, width, ticks, svg, valueScale, tickLabels) {
  ticks.forEach((tick, index) => {
    svg
      .append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', valueScale(tick))
      .attr('fill', 'none')
      .attr('stroke', '#d7b442')

    svg
      .append('text')
      .attr('font-family', 'Roboto Slab')
      .attr('font-size', '12px')
      .attr('x', width / 2)
      .attr('y', height / 2 - valueScale(tick))
      .attr('text-anchor', 'left')
      .attr('dominant-baseline', 'baseline')
      .text(tickLabels[index])
  })
  svg.call(tip.tooltip)

}

/**
 * @param angle
 * @param radius
 */
function angleToCoordinate (angle, radius) {
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  return { x, y }
}




/**
 * @param data
 * @param svg
 * @param valueScale
 * @param radius
 * @param width
 * @param height
 */
export function drawRadarPath (data, svg, valueScale, radius, width, height) {
  const marocData = data.find(d => d.Equipe === 'Total Maroc');
  const adversaireData = data.find(d => d.Equipe === 'Total Adversaires');

  const marocValues = Object.values(marocData).slice(1).map((value, i) => ({
    team: 'Total Maroc',
    label: Object.keys(marocData)[i+1],
    value,
    radius: valueScale(value / 100),
    angle: (i * 2 * Math.PI) / (Object.keys(marocData).length - 1)
  }));

  const adversaireValues = Object.values(adversaireData).slice(1).map((value, i) => ({
    team: 'Total Adversaires',
    label: Object.keys(adversaireData)[i+1],
    value,
    radius: valueScale(value / 100),
    angle: (i * 2 * Math.PI) / (Object.keys(adversaireData).length - 1)
  }));

  const line = d3.lineRadial()
    .angle(d => d.angle)
    .radius(d => d.radius)
    .curve(d3.curveLinearClosed)

  svg.selectAll()
    .data([marocValues, adversaireValues])
    .enter()
    .append('path')
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', d => d[0].team === 'Total Maroc' ? '#3c906c' : '#c72527')
    .attr('stroke-width', 2)
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  svg.selectAll('.dot')
    .data([...marocValues, ...adversaireValues])
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => d.radius * Math.sin(d.angle))
    .attr('cy', d => -d.radius * Math.cos(d.angle))
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .attr('r', 4) 
    .attr('fill', d => d.team === 'Total Maroc' ? '#3c906c' : '#c72527')
    .on('mouseover', function(_event, d) { tip.tooltip.show(d, this); })
    .on('mouseout', tip.tooltip.hide);
}


/**
 * @param data
 * @param svg
 * @param valueScale
 * @param radius
 * @param width
 * @param height
 */
export function drawAreaLines (data, svg, valueScale, radius, width, height) {
  const featureData = Object.keys(data[0])
    .slice(1)
    .map((key, i) => {
      const angle = ((2 * Math.PI * i) / (Object.keys(data[0]).length - 1)) - Math.PI / 2
      return {
        label: labelMapping[key],
        angle: angle,
        line_coord: angleToCoordinate(angle, radius),
        label_coord: angleToCoordinate(angle, radius + 60)
      };
    })

  svg
    .selectAll('line')
    .data(featureData)
    .join('line')
    .attr('x1', width / 2)
    .attr('y1', height / 2)
    .attr('x2', (d) => width / 2 + d.line_coord.x)
    .attr('y2', (d) => height / 2 + d.line_coord.y)
    .attr('stroke', 'darkgoldenrod')

  svg
    .selectAll('.axislabel')
    .data(featureData)
    .join('text')
    .attr('font-family', 'Roboto Slab')
    .attr('font-size', '12px')
    .attr('text-anchor', 'middle')
    .attr('x', (d) => width / 2 + d.label_coord.x)
    .attr('y', (d) => height / 2 + d.label_coord.y)
    .text((d) => '% ' + d.label)
}
