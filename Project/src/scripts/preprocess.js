/**
 * @param {object[]} dataA The data
 * @param {object[]} dataB The data
 * @param {string} keyA The column name in dataA to match on
 * @param {string} keyB The column name in dataB to match on
 * @returns {object[]} The merged dataA and dataB
 */
export function mergeDataByKeys (dataA, dataB, keyA, keyB) {
  var mergedData = dataA.map(function (dataAItem) {
    var matching = dataB.find(function (dataBItem) {
      return dataBItem[keyB] === dataAItem[keyA]
    })
    return { ...dataAItem, ...matching }
  })
  return mergedData
}

/**
 * @param {object[]} data The data
 * @param {string} colName The column name
 * @returns {object[]} The merged data and a column
 */
export function addCodePlayerColumn (data, colName) {
  data.forEach(item => {
    item[colName] = item.player.replace(/ /g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  })
  return data
}

/**
 * @param {string} csvNames The CSV names
 * @param {Array[]} csvFiles The CSV data
 * @returns {object[]} The data with minutes and number of games played by players
 */
export function getMinutesGames (csvNames, csvFiles) {
  const playerData = []
  csvFiles.forEach((data, index) => {
    const playerName = csvNames[index].split('PlayTime')[1].substring(1)
    const playerInfo = data.map((row) => ({
      Min: +row.Min,
      Starts: +row.MP
    }))
    const maxMin = Math.max(...playerInfo.map((info) => info.Min))
    const maxStarts = Math.max(...playerInfo.map((info) => info.Starts))

    playerData.push({
      codePlayer: playerName,
      minutes: maxMin,
      games: maxStarts
    })
  })
  return playerData
}

/**
 * @param {object[]} data The data
 * @returns {object[]} The data with the ages of players
 */
export function getAges (data) {
  const playersWithAge = data.map(player => ({
    ...player,
    age: player.year - player.birth
  }))
  return playersWithAge
}

/**
 * @param {object[]} data The data
 * @returns {object[]} The data with the age counts
 */
export function ageCounts (data) {
  const ages = data.map(player => player.age)

  const ageCounts = d3.rollup(
    ages,
    v => v.length,
    d => d
  )

  // Create list of objects { age, count } sorted by age
  const sortedAgeCounts = Array.from(ageCounts.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([age, count]) => ({ age, count }))

  return sortedAgeCounts
}

/**
 * @param {Array[]} dataSet the data to analyze
 * @param {string} country The country name
 * @returns {object[]} The data with informations about the players
 */
export function getPlayersNames (dataSet, country) {
  const playerData = []
  dataSet.forEach((data) => {
    if (data.Nationality === country) {
      playerData.push(data)
    }
  })
  return playerData
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Player : ___, Years: ___ }, ...
 * ]
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by years
 */
export function summarizeBallonDor (data) {
  const players = []
  const summarizedData = []

  data.forEach(dataCSV => {
    if (!players.includes(dataCSV.player)) players.push(dataCSV.player)
  })

  players.forEach(player => {
    const years = []

    data.forEach(dataCSV => {
      if (dataCSV.player === player) {
        years.push(dataCSV.year)
      }
    })

    if (years.length > 1) {
      years.sort()
      summarizedData.push({ Player: player, Years: years })
    }
  })

  // Sort summarizedData array in descending order based on number of years
  summarizedData.sort((a, b) => b.Years.length - a.Years.length)

  return summarizedData
}
