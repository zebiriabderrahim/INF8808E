"use strict";

import * as viz from "./viz_5";
import * as helper from "./helper";

export function build(category = "all") {
  (function (d3) {
    d3.csv("./italian_team_event_frequencies.csv").then(function (data) {
      if (category !== "all") {
        data = data.filter((d) => d.Category === category);
        console.log(data);
      }

      const margin = { top: 40, right: 30, bottom: 60, left: 150 };
      const width = 1030 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      d3.select(".viz5-container").selectAll("*").remove(); // Clear previous SVG
      const svg = helper.generateSVG(width, height, margin);

      // legend.drawLegend();
      viz.drawBarChart(data, svg, width, height);
    });
  })(d3);
}
document
  .getElementById("categoryDropdown")
  .addEventListener("change", function () {
    const selectedCategory = this.value;
    build(selectedCategory);
  });

const dropdown = document.getElementById("categoryDropdown");
const colors = ["#008C45", "#1c9caf", "#CD212A"];
let previousColorIndex = -1;

dropdown.addEventListener("mouseover", function () {
  let newColorIndex;
  do {
    newColorIndex = Math.floor(Math.random() * colors.length);
  } while (newColorIndex === previousColorIndex);
  dropdown.style.backgroundColor = colors[newColorIndex];
  previousColorIndex = newColorIndex;
});
