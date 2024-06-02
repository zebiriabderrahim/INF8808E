/**
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
  // TODO : Set scale
  const populations = data['2000'].concat(data['2015']).map(d => d.Population)
  return d3.scaleLinear()
    .domain(d3.extent(populations))
    .range([5, 20])
}

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
  // TODO : Set scale
  const continents = new Set(data['2000'].concat(data['2015']).map(country => country.Continent))
  return d3.scaleOrdinal(d3.schemeSet1).domain(Array.from(continents))
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, data) {
  const GDPs = data['2000'].concat(data['2015']).map(d => d.GDP)
  return d3.scaleLog()
    .domain(d3.extent(GDPs))
    .range([0, width])
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  // TODO : Set scale
  const CO2s = data['2000'].concat(data['2015']).map(d => d.CO2)
  return d3.scaleLog()
    .domain(d3.extent(CO2s))
    .range([height, 0])
}
