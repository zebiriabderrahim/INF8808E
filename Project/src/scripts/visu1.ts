import * as d3 from "d3";
const width = 800;
const height = 600;

export function createVisu1(ps: any, lu: any) {
  // Preprocessing
  ps = ps
    .filter((d: any) => d.StatsName === "Goals")
    .map((d: any) => {
      return {
        player: d.PlayerName + " " + d.PlayerSurname,
        goals: +d.Value,
      };
    });
  lu = lu
    .map((d: any) => {
      return {
        country: d.Country,
        player: d.OfficialName + " " + d.OfficialSurname,
      };
    })
    .filter((d: any) => d.Country !== "None");
  ps = Array.from(
    d3
      .rollup(
        ps,
        (v: any) => v[0],
        (d: any) => d.player,
      )
      .values(),
  );
  lu = Array.from(
    d3
      .rollup(
        lu,
        (v: any) => v[0],
        (d: any) => d.player,
      )
      .values(),
  );
  let data = ps
    .map((p: any) => {
      const l = lu.find((l: any) => l.player === p.player);
      return {
        country: l.country,
        goals: p.goals,
        player: p.player,
      };
    })
    .filter((d: any) => d.country !== "None");
  data = Array.from(
    d3
      .rollup(
        data,
        (v: any) => {
          return {
            country: v[0].country,
            avg: d3.sum(v, (d: any) => d.goals) / v.length,
          };
        },
        (d: any) => d.country,
      )
      .values(),
  );

  console.log(data);

  // Scales
  const scaleX = d3
    .scaleBand()
    .domain(data.map((d: any) => d.country))
    .range([0, width])
    .padding(0.1);

  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(data.map((d: any) => d.avg))])
    .range([height, 0]);

  const div = d3.select("body").append("div").attr("class", "container");
  const svg = div
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg1");
  const g = svg.append("g").attr("class", "graph1");

  appendAxes(g, scaleX, scaleY);

  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d: any) => scaleX(d.country) || 0)
    .attr("y", (d: any) => scaleY(d.avg))
    .attr("width", scaleX.bandwidth())
    .attr("height", (d: any) => height - scaleY(d.avg))
    .attr("fill", "steelblue");
}

function appendAxes(g: any, scaleX: any, scaleY: any) {
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height - 50})`)
    .call(d3.axisBottom(scaleX).tickSizeOuter(0).tickArguments([5, "~s"]))
    .selectAll("text")
    .attr("transform", "translate(0, 70) rotate(-70)")
    .style("text-anchor", "start");

  g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(scaleY).tickSizeOuter(0).tickArguments([5, "~s"]));
}
