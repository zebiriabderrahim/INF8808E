'use strict'

import * as helper from './helper'
import * as viz from './viz_5'

/**
 * Builds a bar chart visualization based on the provided data.
 *
 * @param {string} category - The category to filter the data by. Defaults to 'all'.
 */
export function build (category = 'all') {
  (function (d3) {
    d3.csv('./italian_team_event_frequencies.csv').then(function (data) {
      if (category !== 'all') {
        data = data.filter((d) => d.Category === category)
      }

      const margin = { top: 40, right: 30, bottom: 60, left: 150 }
      const width = 1030 - margin.left - margin.right
      const height = 500 - margin.top - margin.bottom

      d3.select('.viz5-container').selectAll('*').remove()
      const svg = helper.generateSVG(width, height, margin)

      viz.drawBarChart(data, svg, width, height)
    })
  })(d3)
}

document
  .getElementById('categoryDropdown')
  .addEventListener('change', function () {
    const selectedCategory = this.value
    build(selectedCategory)
  })
