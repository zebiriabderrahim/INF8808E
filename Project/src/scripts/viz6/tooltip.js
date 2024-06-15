/**
 * @param d
 */
export function getContents (d) {
  return `
  <strong>Joueur:</strong> ${d.data.Joueur}<br/>
  <strong>Passes clés:</strong> ${d.data['Passes clés']}<br/>
  <strong>Passes décisives:</strong> ${d.data['Passes décisives']}<br/>
  <strong>Buts:</strong> ${d.data.Buts}<br/>
`;
  }
  