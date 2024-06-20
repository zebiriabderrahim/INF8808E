import d3Tip from 'd3-tip'

export const tooltip = d3Tip()
  .attr('class', 'd3-tip')
  .html(function (d) {
    return getContent(d)
  })

/**
 * @param d
 */
function getContent (d) {
  return `
    <div>
      <strong>Event:</strong> <span style='font-style: italic'>${d.Event}</span><br>
      <strong>Count:</strong> <span style='font-style: bold'>${d.Frequency}</span>
    </div>
  `
}
