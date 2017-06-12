import * as d3 from "d3"
import * as topojson from "topojson"

function draw(data, map) {

    var height = 600
    var width = 1200

    /* SVG */
    var svg = d3.select("svg")
        .attr("height", height)
        .attr("width", width)



    /* ZOOM */
    svg.call(d3.zoom()
        .scaleExtent([1 / 2, 8])
        .on("zoom", zoomed))

    function zoomed() {
        g.attr("transform", d3.event.transform);
    }

    /* Group */
    var g = svg.append("g")

    /* Projection */
    var projection = d3.geoMercator()
        .translate([width / 2, height / 2])
        .scale(150)

    /* Path */
    var path = d3.geoPath()
        .projection(projection)

    /* Country data */
    var countries = topojson.feature(map, map.objects.countries).features


    /* Radius domain */
    var min = d3.min(data.features, (d) => Number(d.properties.mass))
    var max = d3.max(data.features, (d) => Number(d.properties.mass))

    /* Meteorite radius */
    var radius = d3.scalePow()
        .domain([min, 100000, max])
        .range([1, 5, 50])

    /* Meteorite color */
    var color = d3.scaleLinear()
        .domain([min, 100000, max])
        .range(["#6585c4", "#c94a21", "#d00f0f"])

    /* Tooltip */
    var tooltip = d3.select(".container")
        .append("div")
        .attr("class", "tooltip")

    /* Draw world map */
    g.selectAll("path")
        .data(countries)
        .enter()
        .append("path")
            .attr("d", path)



    /* Draw meteorites */
    g.selectAll("circle")
        .data(data.features)
        .enter()
        .append("circle")
            .attr("class", "meteorite")
            .attr("cx", (d) => {
                if (d.geometry) {
                    return projection(d.geometry.coordinates)[0]
                } else {
                    return 0
                }
            })
            .attr("cy", (d) => {
                if (d.geometry) {
                    return projection(d.geometry.coordinates)[1]
                } else {
                    return 0
                }
            })
            .attr("r", (d) => {
                if (d.geometry) {
                    return radius(d.properties.mass)
                } else {
                    return 0
                }
            })
            .attr("fill", (d) => color(d.properties.mass))
            .on("mouseover", function(d) {
                var coordinates = d3.mouse(this)


                tooltip
                    .style("opacity", 1)
                    .style("left", coordinates[0] + "px")
                    .style("top", coordinates[1] + "px")
                    .html("<p>" + d.properties.name + ", " + (new Date(d.properties.year).getFullYear())  + "</p><p>Mass: "+d.properties.mass+"</p><p>Class: "+ d.properties.recclass +"</p>")

            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0)
            })
}

export default draw
