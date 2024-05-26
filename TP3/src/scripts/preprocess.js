/**
 * Gets the names of the neighborhoods.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the neighorhoods in the data set
 */
export function getNeighborhoodNames (data) {
  return data.reduce((acc, item) => {
    if (!acc.includes(item.Arrond_Nom)) {
      acc.push(item.Arrond_Nom)
    }
    return acc
  }, [])
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
  return data.filter(item => {
    const year = new Date(item.Date_Plantation).getFullYear()
    return year >= start && year <= end
  })
}

/**
 * Summarizes how any trees were planted each year in each neighborhood.
 *
 * @param {object[]} data The data set to use
 * @returns {object[]} A table of objects with keys 'Arrond_Nom', 'Plantation_Year' and 'Counts', containing
 * the name of the neighborhood, the year and the number of trees that were planted
 */
export function summarizeYearlyCounts (data) {
  return data.reduce((acc, item) => {
    const existingData = acc.find(
      element => element.Arrond_Nom === item.Arrond_Nom && element.Plantation_Year === new Date(item.Date_Plantation).getFullYear()
    )
    if (existingData) {
      existingData.Counts++
    } else {
      acc.push({
        Arrond_Nom: item.Arrond_Nom,
        Plantation_Year: new Date(item.Date_Plantation).getFullYear(),
        Counts: 1
      })
    }
    return acc
  }, [])
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
  const allYears = range(start, end)
  const allData = []
  for (const neighborhood of neighborhoods) {
    for (const year of allYears) {
      const existingData = data.find(item => item.Arrond_Nom === neighborhood && item.Plantation_Year === year)
      if (existingData) {
        allData.push(existingData)
      } else {
        allData.push({
          Arrond_Nom: neighborhood,
          Plantation_Year: year,
          Counts: 0
        })
      }
    }
  }
  return allData
}
