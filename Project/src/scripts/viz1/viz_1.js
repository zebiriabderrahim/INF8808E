import * as tip from './tooltip'

const width = 900
const height = 400
const margin = { top: 50, right: 20, bottom: 50, left: 50 }
const graphWidth = width - margin.left - margin.right
const graphHeight = height - margin.top - margin.bottom

/**
 * @param data
 */
function convertData (data) {
  data.forEach(function (d) {
    d.V = +d.V
    d.N = +d.N
    d.D = +d.D
  })
}

/**
 * @param data
 * @returns {*}
 */
function createXScale (data) {
  return d3
    .scaleBand()
    .domain(data.map((d) => d.Équipe))
    .range([0, graphWidth])
    .padding(0.2)
}

/**
 * @returns {*}
 */
function createYScale () {
  return d3.scaleLinear().domain([0, 8]).range([graphHeight, 0])
}

/**
 *  @returns{*}
 */
function createColorScale () {
  return d3
    .scaleOrdinal()
    .domain(['Victoires', 'Nul', 'Défaites'])
    .range(['#3c906c', '#d7b442', '#c72527'])
}

/**
 * @param svg
 * @param xScale
 * @param yScale
 * @param colorScale
 * @param data
 * @returns {*}
 */
function createStackedBars (svg, xScale, yScale, colorScale, data) {
  const graph = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  const stackedData = d3
    .stack()
    .keys(['V', 'N', 'D'])
    .value((d, key) => d[key])(data)

  const stackedBars = graph
    .selectAll('.stacked-bar')
    .data(stackedData)
    .enter()
    .append('g')
    .attr('class', 'stacked-bar')
    .attr('fill', (d) => colorScale(d.key))

  stackedBars
    .selectAll('rect')
    .data((d) => d)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(d.data.Équipe))
    .attr('y', (d) => yScale(d[1]))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
    .on('mouseover', (event, d) => {
      tip.show(event, d)
    })
    .on('mouseout', () => {
      tip.hide()
    })
    .on('mousemove', () => {
      tip.update(d3.event)
    })

  return graph
}

/**
 * @param graph
 * @param xScale
 */
function addXAxis (graph, xScale) {
  const xAxisTitle = 'Équipes'

  graph
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${graphHeight})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .attr('font-family', 'Roboto Slab')
    .attr('font-size', '12px')

  graph
    .append('text')
    .attr('class', 'axis-title')
    .attr('x', graphWidth / 2)
    .attr('y', graphHeight + margin.bottom - 10)
    .attr('text-anchor', 'middle')
    .text(xAxisTitle)
}

/**
 * @param graph
 * @param yScale
 */
function addYAxis (graph, yScale) {
  const yAxisTitle = 'Nombre de matchs'
  graph
    .append('g')
    .attr('class', 'y-axis')
    .attr('font-family', 'Roboto Slab')
    .attr('font-size', '12px')
    .call(d3.axisLeft(yScale))

  graph
    .append('text')
    .attr('class', 'axis-title')
    .attr('transform', 'rotate(-90)')
    .attr('x', -graphHeight / 2)
    .attr('y', -margin.left + 20)
    .attr('text-anchor', 'middle')
    .text(yAxisTitle)
}

/**
 * @param svg
 * @param colorScale
 */
function addLegend (svg, colorScale) {
  const legend = svg
    .append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${margin.left + graphWidth - 10},${margin.top})`)

  const domain = colorScale.domain().slice(0, 3)

  legend
    .selectAll('.legend-item')
    .data(domain)
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('font-family', 'Roboto Slab')
    .attr('font-size', '12px')
    .attr('transform', (d, i) => `translate(0,${i * 20})`)
    .each(function (d) {
      const item = d3.select(this)
      item
        .append('rect')
        .attr('x', 0)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', colorScale(d))
      item.append('text').attr('x', 24).attr('y', 9).attr('dy', '0.35em').text(d)
    })
}

/**
 * @param svg
 * @param data
 */
export function createGraph (svg, data) {
  convertData(data)

  const xScale = createXScale(data)
  const yScale = createYScale()
  const colorScale = createColorScale()

  const graph = createStackedBars(svg, xScale, yScale, colorScale, data)

  addXAxis(graph, xScale)
  addYAxis(graph, yScale)
  addLegend(svg, colorScale)
}

tip.initialize()
