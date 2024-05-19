/**
 * Gets the names of the neighborhoods.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the neighorhoods in the data set
 */
export function getNeighborhoodNames (data) {
  const neighborhoodNames = [...new Set(data.map(item => item.Arrond_Nom))]
  return neighborhoodNames
}

/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @returns {object[]} The filtered data
 */
export function filterYears (data, start, end) {
  const filteredData = data.filter(item => {
    const year = new Date(item.Date_Plantation).getFullYear()
    return year >= start && year <= end
  })

  return filteredData
}

/**
 * Summarizes how any trees were planted each year in each neighborhood.
 *
 * @param {object[]} data The data set to use
 * @returns {object[]} A table of objects with keys 'Arrond_Nom', 'Plantation_Year' and 'Counts', containing
 * the name of the neighborhood, the year and the number of trees that were planted
 */
export function summarizeYearlyCounts (data) {
  const summarizedData = data.reduce((acc, item) => {
    const key = `${item.Arrond_Nom}-${item.Date_Plantation}`
    if (!acc[key]) {
      acc[key] = {
        Arrond_Nom: item.Arrond_Nom,
        Plantation_Year: item.Date_Plantation,
        Counts: 0
      }
    }
    acc[key].Counts++
    return acc
  }, {})

  return Object.values(summarizedData)
}

/**
 * For the heat map, fills empty values with zeros where a year is missing for a neighborhood because
 * no trees were planted or the data was not entered that year.
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} neighborhoods The names of the neighborhoods
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new object for missing year and neighborhood combinations,
 * where the values for 'Counts' is 0
 */
export function fillMissingData (data, neighborhoods, start, end, range) {
  const result = []
  neighborhoods.forEach(neighborhood => {
    for (let year = start; year <= end; year++) {
      const existingData = data.find(item => item.Arrond_Nom === neighborhood && item.Date_Plantation === year)
      if (!existingData) {
        result.push({
          Arrond_Nom: neighborhood,
          Plantation_Year: year,
          Counts: 0
        })
      }
    }
  })
  return result
}
