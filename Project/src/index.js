/* eslint-disable no-trailing-spaces */
'use strict'

import * as helper from './scripts/helper.js'
import * as viz from './scripts/viz.js'
import * as preprocess from './scripts/preprocess.js'
import * as legend from './scripts/legend.js'
import * as tooltip from './scripts/tooltip.js'
import * as scales from './scripts/scales.js'

import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for Project for the course INF8808.
 * @author Andressa Oliveira (2122266), Abdelaziz Kheloufi (2023424), and Lotfi Fodil (2021084)
 * @version v1.0.0
 */

(function (d3) {
  const margin = {
    top: 75,
    right: 200,
    bottom: 100,
    left: 80
  }

  let currentYearViz3 = 2012
  let currentYearViz4 = 2012
  const years = [1955, 1960, 1970, 1980, 1990, 2000, 2010, 2012]

  let svgSize, graphSize
  // Define an array of file paths for the CSV files
  const playTimePaths = helper.listOfPlayTimeCSVs()
  var filePaths = ['./ballondor.csv', './positions.csv'].concat(playTimePaths)
  var worldPath = ['./custom.geo.json']

  /**
   * Visualization 1
   *
   */
  Promise.all(worldPath.map(function (filePath) {
    return d3.json(filePath)
  })).then(function (world) {
    // viz 1
    setSizing('#map-viz1')
    const g = helper.generateG(margin, 'viz1')

    // Create a projection to transform latitude and longitude coordinates to pixel coordinates
    const projection = d3.geoMercator()
      .fitSize([graphSize.width, graphSize.height], world[0])

    // Create a path generator to convert GeoJSON objects to SVG paths
    const pathGenerator = d3.geoPath().projection(projection)

    // Create a new div element
    const tooltip = document.createElement('div')

    helper.placeTitle(g, graphSize.width)
    viz.setTitleText('#viz1', "Nationality of Ballon d'or winners")

    // Add some content to the div
    // Set the CSS styles for the div
    tooltip.style.position = 'absolute'
    tooltip.style.background = 'white'
    tooltip.style.border = '1px solid black'
    tooltip.style.padding = '0px'
    tooltip.style.display = 'none'
    tooltip.style.borderRadius = '6px'

    // Add the div to the document body
    document.body.appendChild(tooltip)

    d3.csv('./country.csv').then(function (data) {
      d3.csv('./ballondor.csv').then(function (data2) {
        // Define a color scale
        const colorScale = d3.scaleSequential()
          .interpolator(d3.interpolateBlues) // Define the range of colors to interpolate between
          .domain([1, 7]) // Define the domain of values to map to the range of colors

        g.selectAll('path')
          .data(world[0].features)
          .enter()
          .append('path')
          .attr('d', pathGenerator)
          .style('stroke', 'black')
          .style('stroke-width', '0.5px')
          .style('fill', 'white')
          .style('fill', function (dd) {
            const countryData = data.find(c => c.country === dd.properties.admin)
            if (countryData) {
              return colorScale(+countryData.points)
            } else {
              return 'white'
            }
          })
          .on('click', function (d, i) {
            const players = preprocess.getPlayersNames(data2, i.properties.admin)
            if (players.length !== 0) {
              tooltip.innerHTML = `
            <div style="color: #FFF; background-color: #5e4c4f; padding: 10px; border-radius: 5px;">
              <h3 style="margin-top: 0;">${i.properties.admin}</h3>
              <ul style="list-style: none; margin: 0; padding: 0;">
                ${players.map(player => `
                  <li style="padding: 5px 0;">
                    <span style="color: #7ff3b8; font-weight: bold;">${player.year}: </span>
                    <span style="color: #FFF;">${player.player}</span>
                    <span style="color: #7ff3b8; font-style: italic;">(${player.club}, ${player.Nationality})</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          `   
              const closeButton = document.createElement('div')
              closeButton.innerHTML = '&#10005;'
              closeButton.style.position = 'absolute'
              closeButton.style.top = '1px'
              closeButton.style.right = '11px'
              closeButton.style.cursor = 'pointer'
              closeButton.style.color = 'White'
              closeButton.style.fontSize = '30px'
              closeButton.style.fontWeight = 'bold'
              tooltip.appendChild(closeButton)

              closeButton.addEventListener('click', function () {
                tooltip.style.display = 'none'
              })

              tooltip.style.top = event.pageY + 'px'
              tooltip.style.left = event.pageX + 'px'
                
              // Show the tooltip div
              tooltip.style.display = 'block'
            }
          })
          .on('mouseout', function (d) {

          })
        legend.drawLegendViz1(colorScale, g, graphSize.width)
      })
    })
  }).catch(function (error) {
    // Handle any errors that may occur while loading the CSV files
    console.error('Error loading CSV files (viz1):', error)
  })

  /**
   * Visualization 2
   *
   */
  Promise.all(filePaths.map(function (filePath) {
    return d3.csv(filePath)
  })).then(function (dataArray) {
    const ballonDorData = preprocess.summarizeBallonDor(dataArray[0])

    setSizing('#map-viz2')
    const g = helper.generateG(margin, 'viz2')

    const tip = d3Tip().attr('class', 'd3-tip')
      .html(function (d) {
        return tooltip.getContentsViz2(d)
      })
    g.call(tip)
    helper.appendAxes(g)
    helper.appendGraphLabels(g, 'Years', "Ballon d'or won")
    helper.placeTitle(g, graphSize.width)

    viz.positionLabels(g, graphSize.width, graphSize.height)

    const xScale = scales.setXScaleYearsViz2(graphSize.width)
    const yScale = scales.setYScaleViz2(graphSize.height)

    helper.drawXAxis(g, xScale, graphSize.height)
    helper.drawYAxis(g, yScale)
    var colors = ['steelblue', 'green', 'red', 'purple', 'orange', 'magenta', 'teal', 'cyan', 'maroon', 'navy']
    var colorScale = d3.scaleOrdinal()
      .range(colors)

    viz.setTitleText('#viz2', "Multiple Ballon d'or winners")

    /**
     * This function builds the graph.
     *
     * @param {object} data The data to be used
     * @param {*} colorScale The scale for the circles' color
     * @param {*} xScale The x scale for the graph
     * @param {*} yScale The y scale for the graph
     */
    function build (data, colorScale, xScale, yScale) {
      data.forEach(function (player) {
        const playerYears = player.Years
        const lineData = []

        var position = 1
        playerYears.forEach(function (year) {
          const x = xScale(parseInt(year))
          const y = yScale(position)
          lineData.push({ x: x, y: y })
          position++
        })

        viz.drawLines(lineData, player, colorScale, tip)
      })
    }

    build(ballonDorData, colorScale, xScale, yScale)
    legend.drawLegendViz2(colorScale, g, graphSize.width)
  }).catch(function (error) {
    // Handle any errors that may occur while loading the CSV files
    console.error('Error loading CSV files (viz2):', error)
  })

  /**
   * Visualization 3
   *
   */
  Promise.all(filePaths.map(function (filePath) {
    return d3.csv(filePath)
  })).then(function (dataArray) {
    // Extract the loaded data from ballonDorData and positionsData files
    const ballonDorData = dataArray[0]
    const positionsData = dataArray[1]
    var mergedData = preprocess.mergeDataByKeys(ballonDorData, positionsData, 'player', 'player')
    mergedData = preprocess.addCodePlayerColumn(mergedData, 'codePlayer')

    // Extract the loaded data from Playing Time files
    // and get the minutes and games of players
    const PlayingTimeArrays = dataArray.slice(2)
    const minutesAndGames = preprocess.getMinutesGames(playTimePaths, PlayingTimeArrays)

    var viz3Data = preprocess.mergeDataByKeys(mergedData, minutesAndGames, 'codePlayer', 'codePlayer')

    // viz 3
    setSizing('#map-viz3')
    const g = helper.generateG(margin, 'viz3')

    const tip = d3Tip().attr('class', 'd3-tip')
      .html(function (d) {
        return tooltip.getContentsViz3(d)
      })
    g.call(tip)

    helper.appendAxes(g)
    helper.appendGraphLabels(g, 'Years', 'Minutes played')
    helper.placeTitle(g, graphSize.width)

    viz.positionLabels(g, graphSize.width, graphSize.height)

    helper.drawButtons(g, graphSize.width, graphSize.height, '#d3d9d2')

    const radiusScale = scales.setRadiusScale(viz3Data)
    const colorScale = scales.setColorScale(viz3Data)
    let xScale = scales.setXScaleYears(graphSize.width, viz3Data, currentYearViz3)
    const yScale = scales.setYScaleViz3(graphSize.height, viz3Data)

    helper.drawXAxis(g, xScale, graphSize.height)
    helper.drawYAxis(g, yScale)

    legend.drawLegend(colorScale, g, graphSize.width)

    buildScatter(viz3Data, 0, currentYearViz3, radiusScale, colorScale, xScale, yScale)
    viz.setHoverHandlerViz3(tip)

    setClickHandlerBack(g)
    setClickHandlerForward(g)

    /**
     * This function builds the graph.
     *
     * @param {object} data The data to be used
     * @param {number} transitionDuration The duration of the transition while placing the circles
     * @param {Array[]} year The year to be displayed
     * @param {*} rScale The scale for the circles' radius
     * @param {*} colorScale The scale for the circles' color
     * @param {*} xScale The x scale for the graph
     * @param {*} yScale The y scale for the graph
     */
    function buildScatter (data, transitionDuration, year, rScale, colorScale, xScale, yScale) {
      const filteredData = data.filter(d => d.year > year && d.year <= year + 10)
      viz.drawCircles(filteredData, '#viz3', rScale, colorScale, xScale, yScale)
      viz.moveCirclesViz3(g, xScale, yScale, transitionDuration)
      viz.setTitleText('#viz3', 'Relationship between winners, minutes and games played')
    }

    /**
     *   Viz 3:
     *   Sets up the click handler for the button
     *
     *   @param {*} g The d3 Selection of the graph's g SVG element
     */
    function setClickHandlerBack (g) {
      const backButton = g.select('.button.back')

      backButton
        .on('click', () => {
          // Activate the forward button
          if (currentYearViz3 === years[years.length - 1]) {
            g.select('.button.forward')
              .select('rect')
              .attr('pointer-events', null)
              .attr('fill', '#f4f6f4')
          }
          currentYearViz3 = years[years.indexOf(currentYearViz3) - 1]
          xScale = scales.setXScaleYears(graphSize.width, viz3Data, currentYearViz3)
          helper.drawXAxis(g, xScale, graphSize.height)

          buildScatter(viz3Data, 1000, currentYearViz3, radiusScale, colorScale, xScale, yScale)
          viz.setHoverHandlerViz3(tip)

          // Disable the back button
          if (currentYearViz3 === years[0]) {
            backButton.select('rect')
              .attr('pointer-events', 'none')
              .attr('fill', '#d3d9d2')
          }
        }
        )
    }

    /**
     *   Viz 3:
     *   Sets up the click handler for the button
     *
     *   @param {*} g The d3 Selection of the graph's g SVG element
     */
    function setClickHandlerForward (g) {
      const forwardButton = g.select('.button.forward')

      forwardButton
        .on('click', () => {
          // Activate the back button
          if (currentYearViz3 === years[0]) {
            g.select('.button.back')
              .select('rect')
              .attr('pointer-events', null)
              .attr('fill', '#f4f6f4')
          }
          currentYearViz3 = years[years.indexOf(currentYearViz3) + 1]
          xScale = scales.setXScaleYears(graphSize.width, viz3Data, currentYearViz3)
          helper.drawXAxis(g, xScale, graphSize.height)
          
          buildScatter(viz3Data, 1000, currentYearViz3, radiusScale, colorScale, xScale, yScale)
          viz.setHoverHandlerViz3(tip)

          // Disable the forward button
          if (currentYearViz3 === years[years.length - 1]) {
            forwardButton.select('rect')
              .attr('pointer-events', 'none')
              .attr('fill', '#d3d9d2')
          }
        }
        )
    }
  }).catch(function (error) {
    // Handle any errors that may occur while loading the CSV files
    console.error('Error loading CSV files (viz3):', error)
  })

  /**
   * Visualization 4
   *
   */
  Promise.all(filePaths.map(function (filePath) {
    return d3.csv(filePath)
  })).then(function (dataArray) {
    // Extract the loaded data from ballonDorData and positionsData files
    const ballonDorData = dataArray[0]
    const positionsData = dataArray[1]
    var mergedData = preprocess.mergeDataByKeys(ballonDorData, positionsData, 'player', 'player')

    var viz4Data = preprocess.getAges(mergedData)

    // scatter plot and lines
    setSizing('#map-viz4')
    const g1 = helper.generateGViz4(margin, 'viz4', '#graph1')

    const tip = d3Tip().attr('class', 'd3-tip')
      .html(function (d) {
        return tooltip.getContentsViz4(d)
      })
    g1.call(tip)
    helper.appendAxes(g1)
    helper.appendGraphLabels(g1, 'Years', 'Ages')
    helper.placeTitle(g1, graphSize.width)

    viz.positionLabels(g1, graphSize.width - margin.right, graphSize.height)

    helper.drawButtons(g1, graphSize.width - margin.right, graphSize.height, '#ffffff')

    let xScale = scales.setXScaleYears(graphSize.width - margin.right, viz4Data, currentYearViz4)
    const yScale = scales.setYScaleViz4(graphSize.height, viz4Data)

    helper.drawXAxis(g1, xScale, graphSize.height)
    helper.drawYAxis(g1, yScale)

    /**
     * This function builds the graph 01.
     *
     * @param {object} data The data to be used
     * @param {number} transitionDuration The duration of the transition while placing the circles
     * @param {Array[]} year The year to be displayed
     * @param {*} xScale The x scale for the graph
     * @param {*} yScale The y scale for the graph
     */
    function buildGrap1 (data, transitionDuration, year, xScale, yScale) {
      const filteredData = data.filter(d => d.year > year && d.year <= year + 10)
      viz.drawData(filteredData, '#viz41', xScale, yScale)
      viz.moveCirclesViz4(g1, xScale, yScale, transitionDuration)
      viz.setTitleText('#viz41', 'Ages of winning players')
    }
    const transitionDuration = 0
    buildGrap1(viz4Data, transitionDuration, currentYearViz4, xScale, yScale)
    viz.setHoverHandlerViz4(tip)

    setClickHandlerBack(g1)
    setClickHandlerForward(g1)

    // bar graph
    const ageCounts = preprocess.ageCounts(viz4Data)

    const g2 = helper.generateGViz4(margin, 'viz4', '#graph2')

    const tip2 = d3Tip().attr('class', 'd3-tip')
      .html(function (d) {
        return tooltip.getContentsViz4Bar(d)
      })
    g2.call(tip2)

    helper.appendAxes(g2)
    helper.appendGraphLabels(g2, 'Amount of players', 'Ages')

    viz.positionLabels(g2, graphSize.width / 2, graphSize.height)

    const xScaleBar = scales.setXScaleViz4Bar(graphSize.width / 2, ageCounts)
    const yScaleBar = scales.setYScaleViz4Bar(graphSize.height, ageCounts)

    helper.drawXAxis(g2, xScaleBar, graphSize.height)
    helper.drawYAxisBar(g2, yScaleBar)

    /**
     * This function builds the graph 02.
     *
     * @param {object} data The age and number of ages
     * @param {*} xScale The x scale for the graph
     * @param {*} yScale The y scale for the graph
     */
    function buildGrap2 (data, xScale, yScale) {
      viz.drawBar(data, '#viz42', xScale, yScale)
    }
    buildGrap2(ageCounts, xScaleBar, yScaleBar)
    viz.setHoverHandlerViz4Bar(tip)

    /**
     *   Viz 4:
     *   Sets up the click handler for the button
     *
     *   @param {*} g The d3 Selection of the graph's g SVG element
     */
    function setClickHandlerBack (g) {
      const backButton = g.select('.button.back')

      backButton
        .on('click', () => {
          // Activate the forward button
          if (currentYearViz4 === years[years.length - 1]) {
            g.select('.button.forward')
              .select('rect')
              .attr('pointer-events', null)
              .attr('fill', '#f4f6f4')
          }
          currentYearViz4 = years[years.indexOf(currentYearViz4) - 1]
          xScale = scales.setXScaleYears(graphSize.width - margin.right, viz4Data, currentYearViz4)
          helper.drawXAxis(g, xScale, graphSize.height)

          buildGrap1(viz4Data, 1000, currentYearViz4, xScale, yScale)
          viz.setHoverHandlerViz4Bar(tip)

          // Disable the back button
          if (currentYearViz4 === years[0]) {
            backButton.select('rect')
              .attr('pointer-events', 'none')
              .attr('fill', '#ffffff')
          }
        }
        )
    }

    /**
     *   Viz 4:
     *   Sets up the click handler for the button
     *
     *   @param {*} g The d3 Selection of the graph's g SVG element
     */
    function setClickHandlerForward (g) {
      const forwardButton = g.select('.button.forward')

      forwardButton
        .on('click', () => {
          // Activate the back button
          if (currentYearViz4 === years[0]) {
            g.select('.button.back')
              .select('rect')
              .attr('pointer-events', null)
              .attr('fill', '#f4f6f4')
          }
          currentYearViz4 = years[years.indexOf(currentYearViz4) + 1]
          xScale = scales.setXScaleYears(graphSize.width - margin.right, viz4Data, currentYearViz4)
          helper.drawXAxis(g, xScale, graphSize.height)

          buildGrap1(viz4Data, 1000, currentYearViz4, xScale, yScale)
          viz.setHoverHandlerViz4Bar(tip)
          
          // Disable the forward button
          if (currentYearViz4 === years[years.length - 1]) {
            forwardButton.select('rect')
              .attr('pointer-events', 'none')
              .attr('fill', '#ffffff')
          }
        }
        )
    }
  }).catch(function (error) {
    // Handle any errors that may occur while loading the CSV files
    console.error('Error loading CSV files (viz4):', error)
  })

  /**
   * This function handles the graph's sizing.
   *
   * @param {string} id The id of the graph's div
   */
  function setSizing (id) {
    svgSize = {
      width: 1150,
      height: 600
    }

    graphSize = {
      width: svgSize.width - margin.right - margin.left,
      height: svgSize.height - margin.bottom - margin.top
    }

    helper.setCanvasSize(id, svgSize.width, svgSize.height)
  }
})(d3)
