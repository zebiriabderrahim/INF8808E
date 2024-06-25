'use strict'

import * as viz from './viz_6'
import * as helper from './helper'
import * as legend from './legend'

/**
 * Builds the visualization.
 */
export function build () {
  (function (d3) {
    const margin = { top: 50, right: 50, bottom: 100, left: 150 }
    const width = 1000 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom

    const barColors = {
      Italy: '#dd5524',
      default: '#008eaa'
    }

    const svg = helper.generateSVG(width, height, margin)

    /**
     * Loads the data and updates the scales.
     *
     * @param {Array} data - The data to be visualized.
     */
    d3.csv('./attempts_summary_no_matchid.csv').then(function (data) {
      data.forEach(d => {
        d.TotalAttemptsOnTarget = +d.TotalAttemptsOnTarget
        d.TotalAttemptsOffTarget = +d.TotalAttemptsOffTarget
      })

      const xScale = d3.scaleLinear()
      const yScale = d3.scaleLinear()

      viz.updateXScale(xScale, data, width)
      viz.updateYScale(yScale, data, height)

      svg.append('g')
        .attr('height', 20)
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale).tickSizeOuter(10))

      svg.append('g')
        .call(d3.axisLeft(yScale).ticks(5))

      viz.drawScatterPlot(data, barColors, xScale, yScale, svg, width, height, margin)

      legend.drawLegend()
    })
  })(d3)
}
