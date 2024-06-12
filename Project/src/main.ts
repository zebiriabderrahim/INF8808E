import * as d3 from "d3";
import { createVisu1 } from "./scripts/visu1.ts";
import "./style.css";

function create(me: any, mi: any, ps: any, ms: any, lu: any) {
  createVisu1(ps, lu);
  // createVisu2(mi);
  // createVisu3(ms, mi);
  // createVisu4(me, mi, lu);
}

d3.dsv(";", "./src/assets/data/match_events.csv").then((match_events) => {
  d3.dsv(";", "./src/assets/data/match_information.csv").then(
    (match_information) => {
      d3.dsv(";", "./src/assets/data/players_stats.csv").then(
        (players_stats) => {
          d3.dsv(";", "./src/assets/data/match_stats.csv").then(
            (match_stats) => {
              d3.dsv(";", "./src/assets/data/line_ups.csv").then((line_ups) => {
                create(
                  match_events,
                  match_information,
                  players_stats,
                  match_stats,
                  line_ups,
                );
              });
            },
          );
        },
      );
    },
  );
});
