/* funcations */

function renderRectangle(svg, treeData, rectWidth, recthight) {
    var svgG = svg
        .selectAll('g')
        .data(treeData)
        .enter()
        .append('g')

    // Add rectangle
    svgG.append('rect')
        .attr('x', (d) => { return d.y })
        .attr('y', (d) => { return d.x })
        .attr('width', rectWidth)
        .attr('height', recthight)
        .attr('stroke', 'black')
        .attr('fill', '#69a3b2');

    svgG.append("text")
        .attr("x", (d) => { return d.y + (rectWidth / 2) })
        .attr("y", (d) => { return d.x + (recthight / 2) })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .attr("fill", "#fff")
        .text((t) => {
            return `Porcha No: ${t.data.porchaNo}`
        });
}


function renderLinks(svg, linksData, rectWidth, recthight) {
    var diagonal = d3.linkVertical()
        .x(d => d.y)
        .y(d => d.x)
        .source(function (e) {
            return { "x": e.source.x + (recthight / 2), "y": e.source.y + rectWidth }
        })
        .target(function (e) {
            return { "x": e.target.x + (recthight / 2), "y": e.target.y }
        })

    var link = svg.selectAll("pathlink")
        .data(linksData)
        .enter()
        .append("svg:path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("d", diagonal)
}