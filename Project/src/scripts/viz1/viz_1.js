import * as tip from './tooltip'

const width = 400
const height = 300
const margin = { top: 30, right: 20, bottom: 20, left: 20 }
const radius = Math.min(width, height) / 2 - margin.top

// Updated color scale based on your SVG inspection
const color = d3.scaleOrdinal()
  .domain(['WINS', 'LOSSES', 'DRAWS'])
  .range(['#669b45', '#dd5524', '#1c9caf']) // Example colors, adjust based on your SVG

// Map team names to flag image URLs
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
 * @param data
 */
function convertData (data) {
  data.forEach(function (d) {
    d.WINS = +d.WINS
    d.LOSSES = +d.LOSSES
    d.DRAWS = +d.DRAWS
  })
}

/**
 * Add the legend to the main SVG container.
 *
 * @param {object} svg - The main SVG container to add the legend to.
 * @param {Function} colorScale - The color scale used for the chart.
 */
function addLegend (svg, colorScale) {
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width * 3 + margin.right}, ${margin.top})`)

  const domain = colorScale.domain()

  legend.selectAll('.legend-item')
    .data(domain)
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('font-family', 'Roboto Slab')
    .attr('font-size', '12px')
    .attr('transform', (d, i) => `translate(0, ${i * 20})`)
    .each(function (d) {
      const item = d3.select(this)
      item.append('rect')
        .attr('x', 0)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', colorScale(d))
      item.append('text')
        .attr('x', 24)
        .attr('y', 9)
        .attr('dy', '0.35em')
        .text(d)
    })
}

/**
 * @param svg
 * @param data
 * @param team
 */
function createDonutChart (svg, data, team) {
  const pie = d3.pie()
    .value(d => d.value)

  const arc = d3.arc()
    .innerRadius(radius * 0.5) // Adjust the inner radius to create the donut shape
    .outerRadius(radius * 0.8)

  const arcHover = d3.arc()
    .innerRadius(radius * 0.5) // Keep the inner radius the same
    .outerRadius(radius * 0.9) // Increase the outer radius for hover effect

  const teamData = data.filter(d => d.TEAM === team)[0]
  const pieData = pie([
    { key: 'WINS', value: teamData.WINS },
    { key: 'LOSSES', value: teamData.LOSSES },
    { key: 'DRAWS', value: teamData.DRAWS }
  ])

  const chartGroup = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  // Add a light grey disc background for Italy
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

  // Add team label
  chartGroup.append('text')
    .attr('text-anchor', 'middle')
    .attr('y', -radius)
    .attr('x', 0)
    .text(team)
    .attr('fill', '#000')
    .style('font-size', '16px')

  // Add flag image
  chartGroup.append('image')
    .attr('xlink:href', flagMap[team])
    .attr('x', -80) // Adjust position as needed to place flag to the left
    .attr('y', -radius - 20) // Adjust position as needed
    .attr('width', 40)
    .attr('height', 40)

  // Add text annotation for Italy
  if (team === 'Italy') {
    chartGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', radius + 20)
      .attr('x', 0)
      .attr('fill', 'gold')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Winner of EURO 2020')
  }
}

/**
 * @param svg
 * @param data
 */
export function createGraphs (svg, data) {
  convertData(data)

  const teams = data.map(d => d.TEAM)
  const columns = 3 // Number of charts per row
  const rows = Math.ceil(teams.length / columns)

  // Adjust the size of the main SVG container
  svg.attr('width', columns * (width + margin.left + margin.right) + width) // Added extra width for the legend
    .attr('height', rows * (height + margin.top + margin.bottom) + margin.bottom)

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

  // Add a single legend for the entire visualization
  addLegend(svg, color)
}

tip.initialize()
