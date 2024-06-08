import rewind from '@turf/rewind'

const TITLES = {
  '1. Noyau villageois': 'Noyau villageois',
  '2. Rue commerciale de quartier, d’ambiance ou de destination': 'Rue commerciale de quartier, d’ambiance ou de destination',
  '3. Rue transversale à une rue commerciale': 'Rue transversale à une rue commerciale',
  '4. Rue bordant un bâtiment public ou institutionnel  (tels qu’une école primaire ou secondaire, un cégep ou une université, une station de métro, un musée, théâtre, marché public, une église, etc.)': 'Rue bordant un bâtiment public ou institutionnel',
  '5. Rue en bordure ou entre deux parcs ou place publique': 'Rue en bordure ou entre deux parcs ou place publique',
  '6. Rue entre un parc et un bâtiment public ou institutionnel': 'Rue entre un parc et un bâtiment public ou institutionnel',
  '7. Passage entre rues résidentielles': 'Passage entre rues résidentielles'
}

/**
 *  Uses the projection to convert longitude and latitude to xy coordinates.
 *
 * The keys for the coordinate are written to each feature object in the data.
 *
 * @param {object[]} data The data to be displayed
 * @param {*} projection The projection to use to convert the longitude and latitude
 */
export function convertCoordinates (data, projection) {
  // TODO : Add an x and y key to each feature object in the data
  // representing its x and y position according to the projection.
  // Each resulting object should be structured as :

  /*
    {
      type:'...'
      properties:{...}
      geometry:{...}
      x:...
      y:...
    }
  */
  data.features.forEach(feature => {
    const [longitude, latitude] = feature.geometry.coordinates
    const [x, y] = projection([longitude, latitude])

    feature.x = x
    feature.y = y
  })
}

/**
 * Simplifies the titles for the property 'TYPE_SITE_INTERVENTION'. The names
 * to use are contained in the constant 'TITLES' above.
 *
 * @param {*} data The data to be displayed
 */
export function simplifyDisplayTitles (data) {
  // TODO : Simplify the titles as required

  data.features.forEach(feature => {
    const featureType = feature.properties.TYPE_SITE_INTERVENTION
    if (TITLES[featureType]) {
      feature.properties.TYPE_SITE_INTERVENTION = TITLES[featureType]
    }
  })

  // Sort the features based on simplified titles
  data.features.sort((a, b) => {
    const typeA = a.properties.TYPE_SITE_INTERVENTION
    const typeB = b.properties.TYPE_SITE_INTERVENTION
    return typeA.localeCompare(typeB)
  })
}

/**
 * Reverses the coordinates in the GeoJson data using turf's rewind function.
 * See here : https://turfjs.org/docs/#rewind
 *
 * @param {*} data The data to be displayed
 * @returns {*} The GeoJson data with reversed coordinates.
 */
export function reverseGeoJsonCoordinates (data) {
  // TODO : Rewind the GeoJso data.
  return rewind(data, { reverse: true })
}
