/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  const formatNumber = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatter.format(num)
  }

  const createDataItem = (label, value) => ({ label, value })

  const data = [
    createDataItem('Country : ', d['Country Name']),
    createDataItem('Population : ', d.Population),
    createDataItem('GDP : ', formatNumber(d.GDP) + ' $ (USD)'),
    createDataItem('CO2 emissions : ', formatNumber(d.CO2) + ' metric tonnes')
  ]

  const createContent = (data) => {
    return data.map(({ label, value }) => `<div><span class="tooltip-label">${label}</span><span class="tooltip-value">${value}</span></div>`).join('')
  }

  return createContent(data)
}
