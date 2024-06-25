import d3Tip from 'd3-tip'

/**
 * Get the content for the tooltip.
 *
 * @param {any} d - The data object.
 * @returns {string} The tooltip content.
 */
function getContent (d) {
  if (typeof d === 'string') {
    return `Outlier Value: ${d}%`
  }

  const median = d3.median(d.BallPossession)
  const q1 = d3.quantile(d.BallPossession, 0.25)
  const q3 = d3.quantile(d.BallPossession, 0.75)
  const min = d3.min(d.BallPossession)
  const max = d3.max(d.BallPossession)

  return `
    <div>
      <div>Median: ${median}%</div>
      <div>First Quartile: ${q1}%</div>
      <div>Third Quartile: ${q3}%</div>
      <div>Min: ${min}%</div>
      <div>Max: ${max}%</div>
    </div>
  `
}

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})
