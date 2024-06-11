import * as d3 from "d3";
const width = 800;
const height = 600;

export function createVisu1(ps: any, lu: any) {
  ps = ps.filter((d: any) => d.StatsName === "Goals");
  lu = lu
    .map((d: any) => {
      return {
        country: d.Country,
        player: d.OfficialName + " " + d.OfficialSurname,
      };
    })
    .sort((a: any, b: any) => a.country.localeCompare(b.country));
  console.log(ps);
  console.log(lu);

  const scaleX = d3.scaleBand();
  const scaleY = d3.scaleLinear();

  const div = d3.select("body").append("div").attr("class", "container");
  const svg = div
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg1");
  const g = svg.append("g").attr("class", "graph1");
  appendAxes(g);
}

function appendAxes(g: any) {
  g.append("g")
    .attr("class", "x axis")
    .append("text")
    .text("")
    .attr("class", "x axis-text")
    .attr("font-size", 12);
  g.append("g")
    .attr("class", "y axis")
    .append("text")
    .text("")
    .attr("class", "y axis-text")
    .attr("transform", "rotate(-90)")
    .attr("font-size", 12);
}

function drawXAxis(g: any, xScale: any, height: any) {
  g.select(".x.axis")
    .attr("transform", "translate( 0, " + height + ")")
    .call(d3.axisBottom(xScale).tickSizeOuter(0).tickArguments([5, "~s"]));
}

function drawYAxis(g: any, yScale: any) {
  g.select(".y.axis").call(
    d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([5, ".0r"]),
  );
}
