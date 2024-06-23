import * as tip from './tooltip'
import * as helper from './helper'

/**
 * @param scale
 * @param data
 * @param width
 */
export function updateXScale(scale, data, width) {
  scale.domain([20, 80])
    .range([0, width])
}

/**
 * @param scale
 * @param data
 * @param height
 */
export function updateYScale(scale, data, height) {
  const teams = data.map(d => d.TeamName)
  scale.domain(teams)
    .range([0, height])
    .padding([1])
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
  const boxWidth = 15

  // Create a group for each data point
  const groups = svg.selectAll('.box')
    .data(data)
    .enter()
    .append('g')
    .attr("class", "box")
    .attr("transform", d => `translate(0, ${y(d.TeamName)})`);

  // Draw the whiskers
  groups.append("line")
    .attr("x1", d => x(d3.min(helper.getOultiers(d.BallPossession))))
    .attr("y1", 0)
    .attr("x2", d => x(d3.max(helper.getOultiers(d.BallPossession))))
    .attr("y2", 0)
    .attr("stroke", d => d.TeamName === 'Italy' ? color.Italy : color.default)
    .attr("stroke-width", 2)

  // Draw the box
  groups.append("rect")
    .attr("x", d => x(d3.quantile(d.BallPossession, 0.25)))
    .attr("y", -boxWidth / 2)
    .attr("width", d => x(d3.quantile(d.BallPossession, 0.75)) - x(d3.quantile(d.BallPossession, 0.25)))
    .attr("height", boxWidth)
    .attr("fill", d => d.TeamName === 'Italy' ? color.Italy : color.default)
    .on("mouseover", function (event, d) {
      tip.tooltip.show(d, this);
    })
    .on("mouseout", tip.tooltip.hide);

  // Draw the vertical line delimiter
  groups.append("line")
    .attr("x1", d => x(Math.min(d3.min(helper.getOultiers(d.BallPossession)), d3.quantile(d.BallPossession, 0.25))))
    .attr("y1", -boxWidth / 4)
    .attr("x2", d => x(Math.min(d3.min(helper.getOultiers(d.BallPossession)), d3.quantile(d.BallPossession, 0.25))))
    .attr("y2", boxWidth / 4)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  groups.append("line")
    .attr("x1", d => x(Math.max(d3.max(helper.getOultiers(d.BallPossession)), d3.quantile(d.BallPossession, 0.75))))
    .attr("y1", -boxWidth / 4)
    .attr("x2", d => x(Math.max(d3.max(helper.getOultiers(d.BallPossession)), d3.quantile(d.BallPossession, 0.75))))
    .attr("y2", boxWidth / 4)
    .attr("stroke", "black")
    .attr("stroke-width", 2);


  // Draw the median line
  groups.append("line")
    .attr("x1", d => x(d3.median(d.BallPossession)))
    .attr("y1", -boxWidth / 2)
    .attr("x2", d => x(d3.median(d.BallPossession)))
    .attr("y2", boxWidth / 2)
    .attr("stroke", "red");

  // Draw the outliers
  groups.selectAll(".outlier")
    .data(d => {
      const lowerBound = d3.quantile(d.BallPossession, 0.25) - 1.5 * (d3.quantile(d.BallPossession, 0.75) - d3.quantile(d.BallPossession, 0.25));
      const upperBound = d3.quantile(d.BallPossession, 0.75) + 1.5 * (d3.quantile(d.BallPossession, 0.75) - d3.quantile(d.BallPossession, 0.25));
      return d.BallPossession.filter(v => v < lowerBound || v > upperBound);
    })
    .enter()
    .append("circle")
    .attr("class", "outlier")
    .attr("cx", d => x(d))
    .attr("cy", 0)
    .attr("r", 3)
    .attr("fill", "white")
    .attr("stroke", d => d.TeamName === 'Italy' ? color.Italy : color.default)
    .on("mouseover", function (event, d) {
      tip.tooltip.show(d, this);
    })
    .on("mouseout", tip.tooltip.hide);

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
    .text('Team')

  svg.call(tip.tooltip)
}
