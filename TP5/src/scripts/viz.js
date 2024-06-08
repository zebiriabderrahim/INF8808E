/**
 * Sets the domain of the color scale. Each type of site should have its own corresponding color.
 *
 * @param {*} color The color scale to be used
 * @param {object[]} data The data to be displayed
 */
export function colorDomain (color, data) {
  // Set the color domain
  const types = Array.from(new Set(data.features.map(feature => feature.properties.TYPE_SITE_INTERVENTION)))
  color.domain(types)
}

/**
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
export function mapBackground (data, path, showMapLabel) {
  // TODO : Generate the map background and set the hover handlers
  const regions = d3.select('#map-g')
    .selectAll('.region')
    .data(data.features)

  const regionsEnter = regions.enter()
    .append('g')
    .attr('class', 'region')

  regionsEnter.append('path')
    .attr('d', path)
    .attr('fill', '#fff')
    .attr('stroke', '#a7a7a0')
    .on('mouseover', (event, d) => showMapLabel(d, path))
    .on('mouseout', () => {
      d3.select('.main-svg').select('.mapLabel').remove()
    })

  regions.exit().remove()
}

/**
 * When a neighborhood is hovered, displays its name. The center of its
 * name is positioned at the centroid of the shape representing the neighborhood
 * on the map. Called when the neighborhood is hovered.
 *
 * @param {object[]} d The data to be displayed
 * @param {*} path The path used to draw the map elements
 */
export function showMapLabel (d, path) {
  // TODO : Show the map label at the center of the neighborhood
  // by calculating the centroid for its polygon
  const [x, y] = path.centroid(d)

  d3.select('.main-svg')
    .append('text')
    .attr('class', 'mapLabel')
    .attr('x', x)
    .attr('y', y)
    .attr('text-anchor', 'middle')
    .style('font', '11px "Open Sans Condensed"')
    .text(d.properties.NOM)
}

/**
 * Displays the markers for each street on the map.
 *
 * @param {object[]} data The street data to be displayed
 * @param {*} color The color scaled used to determine the color of the circles
 * @param {*} panel The display panel, which should be dislayed when a circle is clicked
 */
export function mapMarkers (data, color, panel) {
  // TODO : Display the map markers.
  // Their color corresponds to the type of site and their outline is white.
  // Their radius is 5 and goes up to 6 while hovered by the cursor.
  // When clicked, the panel is displayed.
  d3.select('#marker-g')
    .selectAll('.marker')
    .data(data.features)
    .join(
      enter => enter.append('circle')
        .attr('class', 'marker')
        .attr('r', 5)
        .each(function (d) {
          const [x, y] = d.geometry.coordinates
          d3.select(this).attr('cx', x).attr('cy', y)
        })
        .attr('fill', d => color(d.properties.TYPE_SITE_INTERVENTION))
        .on('mouseover', function () {
          d3.select(this).attr('r', 6)
        })
        .on('mouseout', function () {
          d3.select(this).attr('r', 5)
        })
        .on('click', function (event, d) {
          panel.display(d, color)
        }),
      update => update
        .attr('fill', d => color(d.properties.TYPE_SITE_INTERVENTION)),
      exit => exit.remove()
    )
}
