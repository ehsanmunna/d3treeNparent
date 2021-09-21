/* funcations */

function renderRectangle(svg, treeData, rectWidth, recthight) {
    
    var svgG = svg
        .selectAll('g')
        .data(treeData)
        .enter()
        .append('g')

    // Add rectangle
    svgG.append('rect')
        // .transition(t)
        .attr('x', (d) => { return d.y })
        .attr('y', (d) => { return d.x })
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('width', rectWidth)
        .attr('height', recthight)
        .attr('stroke', 'black')
        .attr('fill', '#228B22')
        

    svgG.append("text")
        .attr("x", (d) => { return d.y + (rectWidth / 2) })
        .attr("y", (d) => { return d.x + (recthight / 2) })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .attr("fill", "#fff")
        .text((t) => {
            return `(${t.data.uuid}) Porcha No: ${t.data.porchaNo}`
        })
        .attr('pointer-events', 'none');
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
        // .attr('marker-start', 'url(#pointer)')
        .attr("class", "link")
        .attr("fill", "none")
        // .style("stroke-width", function(d) { return Math.sqrt(d.value)})
        .style("stroke-width", 1)
        .attr("stroke", "#2c2c2c")
        .attr("d", diagonal)
}