/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeSet1.
 *
 * @param {object} data The data to be displayed
 * @returns {*} The ordinal scale used to determine the color
 */
export function setColorScale (data) {
  const position = new Set()
  data.forEach(player => position.add(player.position))
  const positionScale = d3.scaleOrdinal(d3.schemeSet1).domain(position)

  return positionScale
}

/**
 * Viz 3:
 * Defines the scale to use for the circle markers' radius.
 *
 * The radius of the circle is linearly proportinal to the population of the given country.
 *
 * The radius is a value defined in the interval [5, 20].
 *
 * @param {object} data The data to be displayed
 * @returns {*} The linear scale used to determine the radius
 */
export function setRadiusScale (data) {
  const games = data.map((d) => d.games)

  const gamesScale = d3.scaleLinear().domain([d3.min(games), d3.max(games)]).range([5, 20])

  return gamesScale
}

/**
 * Viz 3 and 4:
 * Defines the linear scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @param {number} startYear The start year
 * @returns {*} The linear scale in X
 */
export function setXScaleYears (width, data, startYear) {
  const filteredData = data.filter(d => d.year >= startYear && d.year <= startYear + 10)
  const years = filteredData.map((d) => d.year)

  const yearsScale = d3.scaleLinear()
    .domain([d3.min(years), d3.max(years)])
    .range([0, width])

  return yearsScale
}

/**
 * Viz 2:
 * Defines the linear scale used.
 *
 * @param {number} width The width of the graph
 * @returns {*} The linear scale in X
 */
export function setXScaleYearsViz2 (width) {
  const yearsScale = d3.scaleLinear()
    .domain([1957, 2022])
    .range([0, width])

  return yearsScale
}

/**
 * Viz 3:
 * Defines the linear scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScaleViz3 (height, data) {
  const minutes = data.map((d) => d.minutes)

  const minutesScale = d3.scaleLinear()
    .domain([d3.min(minutes), d3.max(minutes)])
    .range([height, 0])

  return minutesScale
}

/**
 * Viz 4 - scatter:
 * Defines the linear scale used to position in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScaleViz4 (height, data) {
  const ages = data.map((d) => d.age)

  const agesScale = d3.scaleLinear()
    .domain([0, d3.max(ages)])
    .range([height, 0])

  return agesScale
}

/**
 * Viz 4 - bar:
 * Defines the linear scale used to position the rects.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScaleViz4Bar (width, data) {
  const counts = data.map((d) => d.count)

  return d3.scaleLinear()
    .domain([0, d3.max(counts)])
    .range([0, width])
}

/**
 * Viz 4 - bar:
 * Defines the linear scale used to position in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScaleViz4Bar (height, data) {
  const ages = data.map((d) => d.age)
  const ageDomain = Array.from({ length: d3.max(ages) - d3.min(ages) + 1 }, (_, i) => i + d3.min(ages))

  return d3.scaleBand()
    .domain(ageDomain)
    .range([height, 0])
    .padding(0.1)
}

/**
 * Viz 2:
 * Defines the linear scale used to position in Y.
 *
 * @param {number} height The height of the graph
 * @returns {*} The linear scale in Y
 */
export function setYScaleViz2 (height) {
// const ages = data.map((d) => d.ages)

  const agesScale = d3.scaleLinear()
    .domain([0, 8])
    .range([height, 0])

  return agesScale
}
