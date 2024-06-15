/**
 * Initialize the tooltip HTML and styles
 */
export function initialize () {
  d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('pointer-events', 'none')
    .style('opacity', 0)
}

/**
 * Show the tooltip.
 *
 * @param {Event} event - The event object.
 * @param {object} data - The data object.
 */
export function show (event, data) {
  const tooltip = d3.select('.tooltip')
  const contents = getContents(data)

  tooltip
    .html(contents)
    .style('left', event.pageX + 'px')
    .style('top', event.pageY + 'px')
    .style('opacity', 1)
}

/**
 * Hide the tooltip.
 */
export function hide () {
  d3.select('.tooltip').style('opacity', 0)
}

/**
 * Update the tooltip position.
 *
 * @param {Event} event - The event object.
 */
export function update (event) {
  if (event) {
    d3.select('.tooltip')
      .style('left', event.pageX + 'px')
      .style('top', event.pageY + 'px')
  }
}

/**
 * Get the tooltip contents.
 *
 * @param {object} data - The data object.
 * @returns {string} - The tooltip contents HTML.
 */
export function getContents (data) {
  const team = data.data.Équipe
  const scoreDifference = data[1] - data[0]
  let resultType = ''

  if (data[0] === 0) {
    resultType = data[1] === 1 ? 'Victoire' : 'Victoires'
  } else if (data[1] === 7) {
    resultType = scoreDifference === 1 ? 'Défaite' : 'Défaites'
  } else {
    resultType = scoreDifference === 1 ? 'Match nul' : 'Matchs nuls'
  }

  const contents = `
    <div id="tooltip-title">${team}</div>
    <p></p>
    <div class="tooltip-value">
      <div>${scoreDifference} ${resultType}</div>
    </div>
  `
  return contents
}
