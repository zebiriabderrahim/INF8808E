/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  /* TODO : Define and return the tooltip contents including :
      + A title stating the hovered element's group, with:
        - Font family: Grenze Gotish
        - Font size: 24px
        - Font weigth: normal
      + A bold label for the player name followed
        by the hovered elements's player's name
      + A bold label for the player's line count
        followed by the number of lines
  */

  /* global d3 */ 
  const tooltip = d3.create()

  tooltip.append('div')
    .append('text')
    .style('font-size', '24px')
    .style('font-family', 'Grenze Gotisch')
    .style('font-weight', 'bold')
    .text(d.target.__data__.Player)
    .append('p')

  tooltip.append('div')
    .append('text')
    .style('font-weight', 'normal')
    .text(d.target.__data__.Count)
    .append('b')
    .style('font-weight', 'normal')
    .text(' lines')

  return tooltip.html()
}