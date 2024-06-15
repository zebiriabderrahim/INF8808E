'use strict'

import * as helper from './helper.js'
import * as viz from './viz_4.js'
import * as legend from './legend.js'
import * as hover from './hover.js'
import * as d3Chromatic from 'd3-scale-chromatic'

/**
 * @file This file is the entry-point for the the code of the performance heatmap.
 */
export function build () {
  (function (d3) {
    let bounds
    let svgSize
    let graphSize

    const margin = { top: 35, right: 300, bottom: 35, left: 300 }

    const xScale = d3.scaleBand().padding(0.025)
    const yScale = d3.scaleBand().padding(0.1)
    const colorScale = d3.scaleSequential(d3Chromatic.interpolateGreens)

    d3.csv('./Performance.csv', d3.autoType).then(function (data) {
      const opponents = data.map(d => { return d.Adversaire })

      viz.setColorScaleDomain(colorScale)

      legend.initGradient(colorScale)
      legend.initLegendBar()
      legend.initLegendAxis()

      const g = helper.generateG(margin)

      helper.appendAxes(g)
      viz.appendRects(data, xScale, yScale, colorScale)

      setSizing()
      build()

      /**
       *   This function handles the graph's sizing.
       */
      function setSizing () {
        bounds = d3.select('.viz4-graph').node().getBoundingClientRect()

        svgSize = {
          width: bounds.width,
          height: 550
        }

        graphSize = {
          width: svgSize.width - margin.right - margin.left,
          height: svgSize.height - margin.bottom - margin.top
        }

        helper.setCanvasSize(svgSize.width, svgSize.height)
      }

      /**
       *   This function builds the graph.
       */
      function build () {
        viz.updateXScale(xScale, data, graphSize.width)
        viz.updateYScale(yScale, opponents, graphSize.height)

        viz.drawXAxis(xScale)
        viz.drawYAxis(yScale, graphSize.width)

        viz.updateRects(xScale, yScale, data, colorScale)

        hover.setRectHandler(xScale, yScale, hover.rectSelected, hover.rectUnselected, hover.selectTicks, hover.unselectTicks)

        legend.draw(margin.left / 1.5, margin.top + 5, graphSize.height - 10, 25, 'url(#gradient)', colorScale)
      }

      window.addEventListener('resize', () => {
        setSizing()
        build()
      })
    })
  })(d3)
}
