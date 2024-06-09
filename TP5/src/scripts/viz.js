/**
 * Sets the domain of the color scale. Each type of site should have its own corresponding color.
 *
 * @param {*} color The color scale to be used
 * @param {object[]} data The data to be displayed
 */
export function colorDomain (color, data) {
  // Set the color domain
  const features = data.features.map((f) => f.properties.TYPE_SITE_INTERVENTION).sort()
  color.domain(features)
}

/**
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
export function mapBackground (data, path, showMapLabel) {
  // TODO : Generate the map background and set the hover
  d3.select('#map-g')
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('d', d => path(d))
    .attr('fill', '#fff')
    .attr('stroke', '#333')
    .on('mouseover', (event, d) => showMapLabel(d, path))
    .on('mouseout', () => d3.select('.map-label').remove())
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
  const pos = path.centroid(d)
  d3.select('#map-g')
    .append('text')
    .attr('class', 'map-label')
    .attr('x', pos[0])
    .attr('y', pos[1])
    .attr('font-size', '12px')
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Open Sans Condensed')
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
    .enter()
    .append('circle')
    .attr('class', 'marker')
    .attr('cx', d => d.geometry.coordinates[0])
    .attr('cy', d => d.geometry.coordinates[1])
    .attr('fill', d => color(d.properties.TYPE_SITE_INTERVENTION))
    .attr('stroke', '#fff')
    .attr('r', '5')
    .on('mouseover', (event, d) => d3.select(event.target).attr('r', '7'))
    .on('mouseout', (event, d) => d3.select(event.target).attr('r', '5'))
    .on('click', (event, d) => panel.display(d, color))
}
