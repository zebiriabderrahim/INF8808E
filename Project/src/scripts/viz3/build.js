'use strict'

import * as viz from './viz_3'
import * as helper from './helper'
import * as legend from './legend'

/**
 * Builds the visualization.
 *
 * @file This file is the entry-point for the code of the performance heatmap.
 */
export function build () {
  (function (d3) {
    const margin = { top: 50, right: 50, bottom: 100, left: 150 }
    const width = 1000
    const height = 600

    const barColors = {
      Italy: '#dd5524',
      default: '#008eaa'
    }

    const xScale = d3.scaleBand().padding(0.2)
    const yScale = d3.scaleLinear()

    const svg = helper.generateSVG(width, height, margin)

    d3.csv('./Average_Goals_per_Player_by_Team.csv').then(function (data) {
      data.forEach(d => {
        d.AverageGoalsPerPlayerByTeam = +d.AverageGoalsPerPlayerByTeam
      })

      viz.updateXScale(xScale, data, width - margin.left - margin.right)
      viz.updateYScale(yScale, data, height)

      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll('text')
        .style('font-style', 'italic')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end')
        .attr('dx', '-0.8em')
        .attr('dy', '0.15em')

      svg.append('g')
        .call(d3.axisLeft(yScale).ticks(5))

      viz.drawBars(data, barColors, xScale, yScale, svg, width, height, margin)

      legend.drawLegend()
    })
  })(d3)
}
