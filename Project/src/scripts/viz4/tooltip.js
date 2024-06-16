import d3Tip from 'd3-tip'

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})

function getContent (d) {
  const median = d3.median(d.BallPossession)
  const q1 = d3.quantile(d.BallPossession, 0.25)
  const q3 = d3.quantile(d.BallPossession, 0.75)
  const iqr = q3 - q1
  const min = d3.min(d.BallPossession)
  const max = d3.max(d.BallPossession)
  const outliers = d.BallPossession.filter(v => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr)

  return `
    <div>
      <div>Median: ${median}</div>
      <div>Q1: ${q1}</div>
      <div>Q3: ${q3}</div>
      <div>Min: ${min}</div>
      <div>Max: ${max}</div>
      <div>Outliers: ${outliers}</div>
    </div>
  `
}
