/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale (scale, data, width) {
  // Set the domain and range of the graph's x scale
  scale.domain(data.map(d => d.Act)).range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
  // Set the domain and range of the graph's y scale
  scale.domain([0, d3.max(data, d => d3.max(d.Players, p => p.Count))]).range([height, 0])
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups (data, x) {
  //  Create the groups

  data.forEach(function (d) {
    d3.select('#graph-g').append('svg')
      .data([d])
      .attr('id', 'subgroup' + d.Act)
      .attr('class', 'subgroup')
      .attr('x', x(d.Act))
      .attr('y', 0)
  })
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars (y, xSubgroup, players, height, color, tip) {
    const data = d3.select('#graph-g').selectAll('.subgroup').data();
    const max = d3.max(data, d => d3.max(d.Players, p => p.Count));
  
    data.forEach(actLines => {
      d3.select('#graph-g').select(`#subgroup${actLines.Act}`).selectAll('rect')
        .data(actLines.Players)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('width', xSubgroup.bandwidth())
        .attr('height', d => y(max - d.Count))
        .attr('fill', d => color(d.Player))
        .attr('x', (_, i) => i * xSubgroup.bandwidth())
        .attr('y', d => height - y(max - d.Count))
        .on('mouseover', (mouseEvent, data) => tip.show(data, mouseEvent.currentTarget))
        .on('mouseout', () => tip.hide());
    });
  }