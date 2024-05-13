
/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames (data) {
  // TODO: Clean the player name data Update the names of the players in the dataset so they follow correct capitalization
  data.forEach(d => {
    d.Player = d.Player.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
  }
  )
  return data
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers (data) {
  // TODO: Find the five top players with the most lines in the play
  const players = {}
  data.forEach(d => {
    if (players[d.Player]) {
      players[d.Player] += 1
    } else {
      players[d.Player] = 1
    }
  })
  const topPlayers = Object.keys(players).sort((a, b) => players[b] - players[a]).slice(0, 5)
  return topPlayers
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines (data) {
  // TODO : Generate the data structure as defined above by grouping the data by act and by player like this * [
//  *  { Act : ___,
//   *    Players : [
//   *     {
//   *       Player : ___,
//   *       Count : ___
//   *     }, ...
//   *    ]
//   *  }, ...
//   * ]
  const nestedData = []
  data.forEach(d => {
    const act = d.Act
    const player = d.Player
    const count = 1
    const actIndex = nestedData.findIndex(obj => obj.Act === act)
    if (actIndex === -1) {
      nestedData.push({ Act: act, Players: [{ Player: player, Count: count }] })
    } else {
      const playerIndex = nestedData[actIndex].Players.findIndex(obj => obj.Player === player)
      if (playerIndex === -1) {
        nestedData[actIndex].Players.push({ Player: player, Count: count })
      } else {
        nestedData[actIndex].Players[playerIndex].Count += count
      }
    }
  })
  return nestedData
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers (data, top) {
  // TODO : For each act, sum the lines uttered by players not in the top 5 for the play
  // and replace these players in the data structure by a player with name 'Other' and
  // a line count corresponding to the sum of lines

  data.forEach(d => {
    const players = d.Players
    const other = players.filter(obj => !top.includes(obj.Player))
    const otherCount = other.reduce((acc, obj) => acc + obj.Count, 0)
    d.Players = players.filter(obj => top.includes(obj.Player))
    d.Players.push({ Player: 'Other', Count: otherCount })
  }
  )
  return data
}
