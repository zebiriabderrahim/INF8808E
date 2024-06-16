import * as tip from './tooltip'

/**
 * @param scale
 * @param data
 * @param width
 */
export function updateXScale (scale, data, width) {
  const max = d3.max(data, d => d3.sum(Object.values(d).slice(1)))
  scale.domain([0, max])
    .range([0, width])
}

/**
 * @param scale
 * @param data
 * @param height
 */
export function updateYScale (scale, data, height) {
  const teams = data.map(d => d.TeamName)
  scale.domain(teams)
    .range([0, height])
    .padding([0.2])
}

/** Draw the box and whisker plot
 * @param data
 * @param color
 * @param x
 * @param y
 * @param svg
 * @param width
 * @param height
 * @param margin
 */
export function drawBoxes (data, color, x, y, svg, width, height, margin) {
  // Draw the box and whisker plot
  const boxWidth = 10;

  // Create a group for each data point
  const groups = svg.selectAll(".box")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "box")
    .attr("transform", d => `translate(0, ${y(d.TeamName)})`);

  // Draw the box
  groups.append("rect")
    .attr("x", d => x(d3.quantile(d.BallPossession, 0.25)))
    .attr("y", -boxWidth / 2)
    .attr("width", d => x(d3.quantile(d.BallPossession, 0.75)) - x(d3.quantile(d.BallPossession, 0.25)))
    .attr("height", boxWidth)
    .attr("fill", d => d.TeamName === 'Italy' ? color.Italy : color.default);

  // Draw the median line
  groups.append("line")
    .attr("x1", d => x(d3.median(d.BallPossession)))
    .attr("y1", -boxWidth / 2)
    .attr("x2", d => x(d3.median(d.BallPossession)))
    .attr("y2", boxWidth / 2)
    .attr("stroke", "red");

  // Draw the whiskers
  groups.append("line")
    .attr("x1", d => x(d3.min(d.BallPossession)))
    .attr("y1", 0)
    .attr("x2", d => x(d3.quantile(d.BallPossession, 0.25)))
    .attr("y2", 0)
    .attr("stroke", d => d.TeamName === 'Italy' ? color.Italy : color.default);

  groups.append("line")
    .attr("x1", d => x(d3.max(d.BallPossession)))
    .attr("y1", 0)
    .attr("x2", d => x(d3.quantile(d.BallPossession, 0.75)))
    .attr("y2", 0)
    .attr("stroke", d => d.TeamName === 'Italy' ? color.Italy : color.default);

  // Draw the outliers
  groups.selectAll(".outlier")
    .data(d => d.BallPossession.filter(v => v < d3.min(d.BallPossession) || v > d3.max(d.BallPossession)))
    .enter()
    .append("circle")
    .attr("class", "outlier")
    .attr("cx", d => x(d))
    .attr("cy", 0)
    .attr("r", 3)
    .attr("fill", "black");

  svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', (width / 2) - 10)
    .attr('y', height + margin.bottom - 10)
    .style('font-weight', 'bold')
    .text('Ball Possession (%)')

  svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 10)
    .attr('dy', '1em')
    .attr('transform', 'rotate(-90)')
    .style('font-weight', 'bold')
    .text('Team Names')

    
  svg.call(tip.tooltip)
}
