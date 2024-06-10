import * as d3 from 'd3';
import { createVisu1 } from './scripts/visu1.ts';
import './style.css';


d3.csv('./src/assets/data/match_events.csv').then(match_events => {
  d3.csv('./src/assets/data/match_information.csv').then(match_information => {
    d3.csv('./src/assets/data/players_stats.csv').then(players_stats => {
      d3.csv('./src/assets/data/match_stats.csv').then(match_stats => {
        d3.csv('./src/assets/data/line_ups.csv').then(line_ups => {
          createVisu1(match_events)
        })
      })
    })
  })
})
