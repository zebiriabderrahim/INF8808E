import * as viz from './viz_1.js'
var width = 1000
var height = 400

/**
 *
 */
export function build () {
  var svg = d3.select('.viz1-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  d3.csv('./Résultats.csv')
    .then(function (data) {
      viz.createGraph(svg, data)
    })
}
