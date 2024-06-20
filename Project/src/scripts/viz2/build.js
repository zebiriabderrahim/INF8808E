'use strict'

import * as viz from './viz_2.js'
import * as helper from './helper.js'
import * as legend from './legend.js'
import * as tooltip from './tooltip.js'

import d3Tip from 'd3-tip'

/**
 *
 */
export function build () {
  (function (d3) {
    const margin = { top: 10, right: 0, bottom: 0, left: 55 }
    const barColors = ['#3c906c', '#c72527']

    let bounds
    let svgSize
    let graphSize

    const xScale = d3.scaleBand().padding(0.3)
    const xSubgroupScale = d3.scaleBand().padding([0.05])
    const yScale = d3.scaleLinear()

    const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
    d3.select('.viz2-main-svg').call(tip)

    d3.csv('./Buts.csv').then(function (data) {
      const teamNames = data.map(d => d['Équipe'])

      const g = helper.generateG(margin)

      helper.appendAxes(g)
      helper.appendGraphLabels(g)

      const color = helper.defineColorScale(barColors, ['Buts', 'Total adversaire'])

      legend.draw(['Buts', 'Total adversaire'], color)

      setSizing()
      build(data, teamNames)

      function setSizing () {
        bounds = d3.select('.viz2-graph').node().getBoundingClientRect()

        svgSize = {
          width: bounds.width - 500,
          height: 700
        }

        graphSize = {
          width: svgSize.width - margin.right - margin.left,
          height: svgSize.height - margin.bottom - margin.top - 50
        }

        helper.setCanvasSize(svgSize.width, svgSize.height)
      }

      /**
       *
       */
      function build () {
        helper.positionLabels(graphSize.width, graphSize.height)

        viz.updateGroupXScale(xScale, data, graphSize.width)
        helper.updateXSubgroupScale(xSubgroupScale, ['Buts', 'Total adversaire'], xScale)
        viz.updateYScale(yScale, data, graphSize.height)

        helper.drawXAxis(xScale, graphSize.height)
        helper.drawYAxis(yScale)

        viz.createGroups(data, xScale)
        viz.drawBars(yScale, xSubgroupScale, ['Buts', 'Total adversaire'], graphSize.height, color, tip)
      }

      window.addEventListener('resize', () => {
        setSizing()
        build(data, teamNames)
      })
    })
  })(d3)
}
