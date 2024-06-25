'use strict'

import * as viz from './viz_7'
import * as helper from './helper'
import * as legend from './legend'

/**
 * Builds the visualization.
 */
export function build () {
  (function (d3) {
    const margin = { top: 35, right: 100, bottom: 50, left: 150 }
    const width = 700
    const height = 600

    const barColors = {
      Italy: '#dd5524',
      default: '#008eaa'
    }

    const yScale = d3.scaleBand()
    const xScale = d3.scaleLinear()

    const svg = helper.generateSVG(width, height, margin)

    /**
     * Loads the data and updates the scales.
     *
     * @param {Array} data - The data to be visualized.
     */
    d3.csv('./pass_accuracy.csv').then(function (data) {
      viz.updateYScale(yScale, data, height)
      viz.updateXScale(xScale, data, width)

      svg.append('g')
        .attr('height', 20)
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale).tickSizeOuter(10))

      svg.append('g')
        .call(d3.axisLeft(yScale).ticks(5))

      viz.drawBars(data, barColors, xScale, yScale, svg, width, height, margin)
    })

    legend.drawLegend()
  })(d3)
}
