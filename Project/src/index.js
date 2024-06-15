import * as performance from './scripts/viz4/build.js'
import * as score from './scripts/viz2/build.js'
import * as results from './scripts/viz1/build.js'
import * as offensive from './scripts/viz6/build.js'
import * as cards from './scripts/viz3/build.js'
import * as radar from './scripts/viz5/build.js'
import * as shots from './scripts/viz7/build.js'

results.build()     // Viz 1
score.build()       // viz 2
cards.build()       // Viz 3
performance.build() // Viz 4
offensive.build()   // Viz 6
radar.build()       // Viz 5
shots.build()       // viz 7
