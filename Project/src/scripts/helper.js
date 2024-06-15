/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @param {string} id The id of the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin, id) {
  return d3.select('#map-' + id)
    .select('svg')
    .append('g')
    .attr('id', id)
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @param {string} id The id of the graph
 * @param {string} graphId The id of the svg
 * @returns {*} The d3 Selection for the created g element
 */
export function generateGViz4 (margin, id, graphId) {
  return d3.select('#map-' + id)
    .select(graphId)
    .append('g')
    .attr('id', id + graphId[graphId.length - 1])
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}
/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {string} id The desired width
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (id, width, height) {
  d3.select(id).select('svg')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x axis')

  g.append('g')
    .attr('class', 'y axis')
}

/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {string} labelX The text of the axis X
 * @param {string} labelY The text of the axis Y
 */
export function appendGraphLabels (g, labelX, labelY) {
  g.append('text')
    .attr('class', 'y axis-text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(0)')
    .attr('font-size', 12)
    .selectAll('tspan')
    .data(labelY.split(' '))
    .enter()
    .append('tspan')
    .text((d) => d)
    .attr('dy', (d, i) => i !== 0 ? 20 : 0)
    .attr('x', -60)

  g.append('text')
    .text(labelX)
    .attr('class', 'x axis-text')
    .attr('font-size', 12)
}

/**
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function placeTitle (g) {
  g.append('text')
    .attr('class', 'title')
    .attr('x', 0)
    .attr('y', -50)
    .attr('font-size', 14)
}

/**
 * Viz 4:
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function placeTitleViz4 (g) {
  g.append('text')
    .attr('class', 'title')
    .attr('x', 0)
    .attr('y', 0)
    .attr('font-size', 14)
}

/**
 * Viz 3:
 * Draws the X axis at the bottom of the diagram.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {*} xScale The scale to use to draw the axis
 * @param {number} height The height of the graphic
 */
export function drawXAxis (g, xScale, height) {
  const xAxis = d3.axisBottom(xScale)
    .tickSizeOuter(0)
    .tickArguments([10, '~s'])
    .tickFormat(d3.format('d'))

  g.select('.x.axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxis)
}

/**
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {*} yScale The scale to use to draw the axis
 */
export function drawYAxis (g, yScale) {
  g.select('.y.axis')
    .call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([5, '.0r']))
}

/**
 * Viz 4 - Bar:
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {*} yScale The scale to use to draw the axis
 */
export function drawYAxisBar (g, yScale) {
  g.select('.y.axis')
    .call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([16, '.0r']))
}

/**
 * Draws the button to toggle the display year.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the button
 * @param {number} height The height of the graph
 * @param {string} color The color of the button disable
 */
export function drawButtons (g, width, height, color) {
  const backButton = g.append('g')
    .attr('class', 'button back')
    .attr('transform', 'translate(' + (width / 2 - 100) + ',' + (height + 20) + ')')
    .attr('width', 50)
    .attr('height', 25)

  backButton.append('rect')
    .attr('width', 70)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  backButton.append('text')
    .attr('x', 35)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('<')
    .attr('font-size', '10px')
    .attr('fill', '#362023')

  const forwardButton = g.append('g')
    .attr('class', 'button forward')
    .attr('transform', 'translate(' + (width / 2 + 50) + ',' + (height + 20) + ')')
    .attr('width', 50)
    .attr('height', 25)

  forwardButton.append('rect')
    .attr('width', 70)
    .attr('height', 30)
    .attr('fill', color)
    .attr('pointer-events', 'none')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  forwardButton.append('text')
    .attr('x', 35)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('>')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * @returns {Array[]} The array with names of PlayTime CSVs
 */
export function listOfPlayTimeCSVs () {
  const csvFiles = [
    './PlayTime/Allan-SimonsenPlayTime.csv',
    './PlayTime/Andriy-ShevchenkoPlayTime.csv',
    './PlayTime/Bobby-CharltonPlayTime.csv',
    './PlayTime/Cristiano-RonaldoPlayTime.csv',
    './PlayTime/Denis-LawPlayTime.csv',
    './PlayTime/EusebioPlayTime.csv',
    './PlayTime/Fabio-CannavaroPlayTime.csv',
    './PlayTime/Florian-AlbertPlayTime.csv',
    './PlayTime/Franz-BeckenbauerPlayTime.csv',
    './PlayTime/George-BestPlayTime.csv',
    './PlayTime/George-WeahPlayTime.csv',
    './PlayTime/Gerd-MullerPlayTime.csv',
    './PlayTime/Gianni-RiveraPlayTime.csv',
    './PlayTime/Hristo-StoichkovPlayTime.csv',
    './PlayTime/Igor-BelanovPlayTime.csv',
    './PlayTime/Jean-Pierre-PapinPlayTime.csv',
    './PlayTime/Johan-CruyffPlayTime.csv',
    './PlayTime/Josef-MasopustPlayTime.csv',
    './PlayTime/KakaPlayTime.csv',
    './PlayTime/Karim-BenzemaPlayTime.csv',
    './PlayTime/Karl-Heinz-RummeniggePlayTime.csv',
    './PlayTime/Kevin-KeeganPlayTime.csv',
    './PlayTime/Lev-YashinPlayTime.csv',
    './PlayTime/Lionel-MessiPlayTime.csv',
    './PlayTime/Lothar-MatthausPlayTime.csv',
    './PlayTime/Luis-FigoPlayTime.csv',
    './PlayTime/Luis-SuarezPlayTime.csv',
    './PlayTime/Luka-ModricPlayTime.csv',
    './PlayTime/Marco-van-BastenPlayTime.csv',
    './PlayTime/Matthias-SammerPlayTime.csv',
    './PlayTime/Michael-OwenPlayTime.csv',
    './PlayTime/Michel-PlatiniPlayTime.csv',
    './PlayTime/Omar-SivoriPlayTime.csv',
    './PlayTime/Paolo-RossiPlayTime.csv',
    './PlayTime/Pavel-NedvedPlayTime.csv',
    './PlayTime/Raymond-KopaPlayTime.csv',
    './PlayTime/RivaldoPlayTime.csv',
    './PlayTime/Roberto-BaggioPlayTime.csv',
    './PlayTime/RonaldinhoPlayTime.csv',
    './PlayTime/RonaldoPlayTime.csv',
    './PlayTime/Ronaldo-NazarioPlayTime.csv',
    './PlayTime/Ruud-GullitPlayTime.csv',
    './PlayTime/Samuel-EtooPlayTime.csv',
    './PlayTime/Sandro-MazzolaPlayTime.csv',
    './PlayTime/Steven-GerrardPlayTime.csv',
    './PlayTime/Thierry-HenryPlayTime.csv',
    './PlayTime/Zinedine-ZidanePlayTime.csv',
    './PlayTime/Oleg-BlokhinPlayTime.csv',
    './PlayTime/Alfredo-Di-StefanoPlayTime.csv',
    './PlayTime/Stanley-MatthewsPlayTime.csv'
  ]
  return csvFiles
}
