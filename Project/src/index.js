import * as performance from './scripts/viz4/build.js'
import * as results from './scripts/viz1/build.js'
import * as offensive from './scripts/viz6/build.js'
import * as averageGoals from './scripts/viz3/build.js'
import * as events from './scripts/viz5/build.js'
import * as passAccuracy from './scripts/viz7/build.js'

results.build() // Viz 1
averageGoals.build() // Viz 3
performance.build() // Viz 4
offensive.build() // Viz 6
events.build() // Viz 5
passAccuracy.build() // viz 7
