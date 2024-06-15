'use strict'

import * as viz from './viz_3'
import * as helper from './helper'
import * as legend from './legend'

/**
 * @file This file is the entry-point for the the code of the performance heatmap.
 */
export function build () {
  (function (d3) {
    const margin = { top: 35, right: 100, bottom: 35, left: 50 }
    const width = 700
    const height = 550

    const barColors = [
      '#d7b442',
      '#c72527'
    ]

    const xScale = d3.scaleBand()
    const yScale = d3.scaleLinear()

    // SVG
    const svg = helper.generateSVG(width, height, margin)

    d3.csv('./Cartons.csv').then(function (data) {
      const subgroups = data.columns.slice(1)

      viz.updateXScale(xScale, data, width)
      viz.updateYScale(yScale, data, height)

      svg.append('g')
        .attr('height', 20)
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale).tickSizeOuter(10))

      svg.append('g')
        .call(d3.axisLeft(yScale).ticks(5))

      const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(barColors)

      viz.drawBars(data, color, xScale, yScale, svg,width-10,height,margin)
    })

    legend.drawLegend()
  })(d3)
}
