import * as tip from './tooltip'

const width = 400
const height = 300
const margin = { top: 30, right: 20, bottom: 20, left: 20 }
const radius = Math.min(width, height) / 2 - margin.top

const color = d3.scaleOrdinal()
  .domain(['WINS', 'LOSSES', 'DRAWS'])
  .range(['#669b45', '#dd5524', '#1c9caf'])

const flagMap = {
  Switzerland: 'https://flagcdn.com/w320/ch.png',
  Spain: 'https://flagcdn.com/w320/es.png',
  Belgium: 'https://flagcdn.com/w320/be.png',
  Italy: 'https://flagcdn.com/w320/it.png',
  'Czech Republic': 'https://flagcdn.com/w320/cz.png',
  Denmark: 'https://flagcdn.com/w320/dk.png',
  Ukraine: 'https://flagcdn.com/w320/ua.png',
  England: 'https://flagcdn.com/w320/gb-eng.png'
}

/**
 * Convert data to the appropriate format.
 *
 * @param {Array} data - The data to be converted.
 */
function convertData (data) {
  data.forEach(function (d) {
    d.WINS = +d.WINS
    d.LOSSES = +d.LOSSES
    d.DRAWS = +d.DRAWS
  })
}

/**
 * Add a legend to the SVG container
 *
 * @param {object} svg - The main SVG container to add the legend to.
 * @param {number} columns - The number of columns in the grid.
 * @param {number} rows - The number of rows in the grid.
 */
function addLegend (svg, columns, rows) {
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${(columns * (width + margin.left + margin.right)) / 2 - 120}, ${height * rows + 40})`) // Center the legend horizontally

  const legendData = [
    { color: '#669b45', label: 'Wins' },
    { color: '#dd5524', label: 'Losses' },
    { color: '#1c9caf', label: 'Draws' }
  ]

  legend.selectAll('.legend-item')
    .data(legendData)
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('font-family', 'Roboto Slab')
    .attr('font-size', '12px')
    .attr('transform', (d, i) => `translate(${i * 100}, 0)`)
    .each(createLegendItem())
}

/**
 * Create a legend item.
 *
 * @returns {Function} - The legend item function.
 */
function createLegendItem () {
  return function (d) {
    const item = d3.select(this)
    item.append('rect')
      .attr('x', 0)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', d.color)
    item.append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '0.35em')
      .text(d.label)
  }
}

/**
 * Create a donut chart.
 *
 * @param {object} svg - The SVG container.
 * @param {Array} data - The data for the chart.
 * @param {string} team - The team name.
 * @returns {void}
 */
function createDonutChart (svg, data, team) {
  const pie = d3.pie()
    .value(d => d.value)

  const arc = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8)

  const arcHover = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.9)

  const teamData = data.filter(d => d.TEAM === team)[0]
  const pieData = pie([
    { key: 'WINS', value: teamData.WINS },
    { key: 'LOSSES', value: teamData.LOSSES },
    { key: 'DRAWS', value: teamData.DRAWS }
  ])

  const chartGroup = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  if (team === 'Italy') {
    chartGroup.append('circle')
      .attr('r', radius * 0.9)
      .attr('fill', '#d3d3d3')
      .attr('transform', 'translate(0, 0)')
  }

  chartGroup.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.key))
    .attr('stroke', 'white')
    .attr('stroke-width', '3px')
    .on('mouseover', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('d', arcHover)
      tip.show(event, d)
    })
    .on('mouseout', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('d', arc)
      tip.hide()
    })
    .on('mousemove', (event) => {
      tip.update(event)
    })

  addChartElements(chartGroup, team)
}

/**
 * Add elements to the chart.
 *
 * @param {object} chartGroup - The chart group.
 * @param {string} team - The team name.
 * @returns {void}
 */
function addChartElements (chartGroup, team) {
  chartGroup.append('text')
    .attr('text-anchor', 'middle')
    .attr('y', -radius)
    .attr('x', 0)
    .text(team)
    .attr('fill', '#000')
    .style('font-size', '16px')

  chartGroup.append('image')
    .attr('xlink:href', flagMap[team])
    .attr('x', -80)
    .attr('y', -radius - 20)
    .attr('width', 40)
    .attr('height', 40)

  if (team === 'Italy') {
    chartGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', radius + 20)
      .attr('x', 0)
      .attr('fill', 'black')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Winner of EURO 2020')
  }
}
/**
 * Create graphs using the provided SVG container and data.
 *
 * @param {object} svg - The SVG container.
 * @param {Array} data - The data for the graphs.
 */
export function createGraphs (svg, data) {
  convertData(data)

  const teams = data.map(d => d.TEAM)
  const columns = 3
  const rows = Math.ceil(teams.length / columns)

  svg.attr('width', columns * (width + margin.left + margin.right))
    .attr('height', rows * (height + margin.top + margin.bottom) + 60)

  teams.forEach((team, i) => {
    const row = Math.floor(i / columns)
    const col = i % columns
    const teamSvg = svg.append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('x', col * (width + margin.left + margin.right))
      .attr('y', row * (height + margin.top + margin.bottom))
    createDonutChart(teamSvg, data, team)
  })

  addLegend(svg, columns, rows)
}

tip.initialize()
