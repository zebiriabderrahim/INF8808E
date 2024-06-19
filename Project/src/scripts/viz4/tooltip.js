import d3Tip from 'd3-tip'

export const tooltip = d3Tip().attr('class', 'd3-tip').html(function (d) {
  return getContent(d)
})

function getContent (d) {
  if (typeof d === 'string') {
    return `Outlier value: ${d}`;
  }

  const median = d3.median(d.BallPossession);
  const q1 = d3.quantile(d.BallPossession, 0.25);
  const q3 = d3.quantile(d.BallPossession, 0.75);
  const min = d3.min(d.BallPossession);
  const max = d3.max(d.BallPossession);

  return `
    <div>
      <div>Median: ${median}</div>
      <div>first quartile: ${q1}</div>
      <div>third quartile: ${q3}</div>
      <div>Min: ${min}</div>
      <div>Max: ${max}</div>
    </div>
  `;
}
