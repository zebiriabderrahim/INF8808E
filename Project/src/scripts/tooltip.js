/**
 * Viz 3:
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContentsViz3 (d) {
  const createDataItem = (label, value) => ({ label, value })
  const data = [
    createDataItem('Player: ', d.player),
    createDataItem('Year: ', d.year),
    createDataItem('Games: ', d.games),
    createDataItem('Minutes: ', d.minutes),
    createDataItem('Position: ', d.position)
  ]

  const createContent = (data) => {
    const container = d3.create('div')
    data.forEach(({ label, value }) => {
      const itemContainer = container.append('div')
      itemContainer.append('span')
        .attr('class', 'tooltip-label')
        .text(label)
      itemContainer.append('span')
        .attr('class', 'tooltip-value')
        .text(value)
    })
    return container.html()
  }

  return createContent(data)
}

/**
 * Viz 4:
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContentsViz4 (d) {
  const createDataItem = (label, value) => ({ label, value })
  const data = [
    createDataItem('Player: ', d.player),
    createDataItem('Age: ', d.age),
    createDataItem('Year: ', d.year)
  ]

  const createContent = (data) => {
    const container = d3.create('div')
    data.forEach(({ label, value }) => {
      const itemContainer = container.append('div')
      itemContainer.append('span')
        .attr('class', 'tooltip-label')
        .text(label)
      itemContainer.append('span')
        .attr('class', 'tooltip-value')
        .text(value)
    })
    return container.html()
  }

  return createContent(data)
}

/**
 * Viz 4 - Bar:
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContentsViz4Bar (d) {
  const createDataItem = (value) => ({ value })
  const data = [
    createDataItem(`${d} ${d === 1 ? 'player' : 'players'}`)
  ]

  const createContent = (data) => {
    const container = d3.create('div')
    data.forEach(({ value }) => {
      const itemContainer = container.append('div')
      itemContainer.append('span')
        .attr('class', 'tooltip-value')
        .text(value)
    })
    return container.html()
  }

  return createContent(data)
}

/**
 * Viz 2:
 * Defines the contents of the tooltip.
 *
 * @param {object} d The 'd' parameter is an object representing a player
 * @returns {string} The tooltip contents
 */
export function getContentsViz2 (d) {
  const playerName = d.Player
  const playerYears = d.Years.join(', ') // Assuming 'Years' is an array of years

  return 'Player: ' + playerName + '<br/>' + 'Years: ' + playerYears
}

/**
 * Viz 1:
 * Defines the contents of the tooltip.
 *
 * @param {object} d The 'd' parameter is an object representing a player
 * @returns {string} The tooltip contents
 */
export function getContentsViz1 (d) {
  const playerName = d.Player
  const playerYears = d.Years.join(', ') // Assuming 'Years' is an array of years

  return 'Player: ' + playerName + '<br/>' + 'Years: ' + playerYears
}
