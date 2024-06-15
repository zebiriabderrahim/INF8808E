'use strict'

import * as viz from './viz_5'
import * as helper from './helper'
import * as legend from './legend'
/**
 * @file This file is the entry point for the code of the radar chart.
 */

/**
 *
 */
export function build () {
  (function (d3) {
    d3.csv('./Métriques.csv').then(function (data) {
      const formattedData = data.map((d) => ({
        Equipe: d['Équipe'],
        Arrêts: parseFloat(d['Arrets%'].replace(',', '.')),
        Gagnés: parseFloat(d['% gagnés'].replace(',', '.')),
        Tcl: parseFloat(d['Tcl%'].replace(',', '.')),
        Possession: parseFloat(d.Possession.replace(',', '.')),
        Cmp: parseFloat(d['Cmp%'].replace(',', '.'))
      }))

      const margin = { top: 70, right: 100, bottom: 35, left: 400 }
      const width = 500
      const height = 400

      const radius = Math.min(width, height) / 2

      const svg = helper.generateSVG(width, height, margin)

      const valueScale = d3.scaleLinear().domain([0, 1]).range([0, radius])

      const ticks = [0, 0.25, 0.5, 0.75, 1]
      const tickLabels = ['0', '25', '50', '75', '100']

      legend.drawLegend()

      viz.drawCircles(height, width, ticks, svg, valueScale, tickLabels)
      viz.drawAreaLines(formattedData, svg, valueScale, radius, width, height)
      viz.drawRadarPath(formattedData, svg, valueScale, radius, width, height)
    })
  })(d3)
}
