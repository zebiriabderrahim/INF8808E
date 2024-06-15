'use strict'

import * as viz from './viz_6'
import * as helper from './helper'
import * as legend from './legend'

/**
 * @file This file is the entry-point for the the code of the offensive contributions of the team
 */

/**
 *
 */
export function build () {
  (function (d3) {
    const margin = { top: 35, right: 100, bottom: 200, left: 50 }
    const width = 1300
    const height = 480

    const colorScale = d3.scaleOrdinal()
      .domain(['Passes clés', 'Passes décisives', 'Buts'])
      .range(['#d7b442', '#c72527', '#3c906c'])

    const barColors = [
      '#FAD02C',
      '#FF0000'
    ]

    const xScale = d3.scaleBand()
    const yScale = d3.scaleLinear()

    const svg = helper.generateSVG(width, height, margin)

    d3.csv('./Offensif.csv').then(function (data) {
      const subgroups = data.columns.slice(1)

      viz.updateXScale(xScale, data, width)
      viz.unpdateYScale(yScale, data, height)

      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll('text')
        .attr('transform', 'translate(-10,10)rotate(-45)')
        .style('text-anchor', 'end')
        .style('font-size', '14px')
        .style('text-anchor', 'end')

      svg.append('text')
        .attr('transform', `translate(${width / 2}, ${height + margin.top + 100})`)
        .style('text-anchor', 'middle')
        .style('font-size', '16px')
        .text('Joueur')

      svg.append('g')
        .call(d3.axisLeft(yScale).ticks(5))

      const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(barColors)

      viz.drawBars(data, color, xScale, yScale, svg)

      legend.drawLegend(svg, colorScale)
    })
  })(d3)
}
