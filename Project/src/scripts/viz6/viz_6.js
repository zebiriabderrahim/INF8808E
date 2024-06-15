import * as d3 from 'd3';
/**
 * @param scale
 * @param data
 * @param width
 */
export function updateXScale (scale, data, width) {
  const joueurs = data.map(d => { return d.Joueur })
  scale.domain(joueurs)
    .range([0, width])
    .padding([0.55])
}

/**
 * @param scale
 * @param data
 * @param height
 */
export function unpdateYScale (scale, data, height) {
  scale.domain([0, 8])
    .range([height, 0])
}

/**
 * @param data
 * @param color
 * @param x
 * @param y
 * @param svg
 */
export function drawBars (data, color, x, y, svg) {
  const colorMapping = {
    Buts: '#3c906c',
    PD: '#c72527',
    PC: '#d7b442'
  }

  const subgroups = data.columns.slice(1)
  const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.1])

  const tooltip = d3.select(".viz6-tooltip");

  svg.append('g')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', d => `translate(${x(d.Joueur) - 10})`) 
    .selectAll('rect')
    .data(function (d) {
      return subgroups.map(function (key) { return { key: key, value: d[key] } })
    })
    .enter().append('rect')
    .attr('x', d => xSubgroup(d.key))
    .attr('y', d => y(d.value))
    .attr('width', xSubgroup.bandwidth())
    .attr('height', d => y(0) - y(d.value))
    .attr('fill', d => colorMapping[d.key])
    .on("mouseover", function(event, d) {      
      tooltip.transition()        
          .duration(200)      
          .style("opacity", .9);      
      tooltip.html(`${d.key}: ${d.value}`)  
          .style("left", (event.pageX) + "px")     
          .style("top", (event.pageY - 28) + "px");    
    })                  
    .on("mouseout", function(event, d) {       
      tooltip.transition()        
          .duration(500)      
          .style("opacity", 0);   
    });
}
