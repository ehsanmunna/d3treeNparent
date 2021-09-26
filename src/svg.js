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
        .attr('id', function (d) { return 'nodeInfoID' + d.id; })
        .attr('x', (d) => { return d.y })
        .attr('y', (d) => { return d.x })
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('width', rectWidth)
        .attr('height', recthight)
        .attr('stroke', 'black')
        .attr('fill', '#00A773')
        // .attr("cursor", "move")
        // .call(d3.drag())


    var foreignObject = svgG.append("foreignObject")
        .attr('x', (d) => { return d.y })
        .attr('y', (d) => { return d.x })

        .attr('width', rectWidth)
        .attr('height', recthight)
        .append('xhtml:div')
        .attr('class', 'node-wrap')

    foreignObject.append('xhtml:div')
        .attr('class', 'node-wrap-separator')
        .html((d) => { return `${d.data.porchaNo}` })
        .append('button')
        .attr('class', 'node-button')
    // .append('img')
    // // .attr('src', 'http://localhost:8000/new_homepage_resources/images/khotian-logo.png')
    foreignObject.append('xhtml:div')
        .attr('class', 'node-wrap-separator node-wrap-header')
        .html((d) => { return `Total Land: ${d.data.land}` })
    foreignObject.append('xhtml:div')
        .attr('class', 'node-wrap-separator')
        .html((d) => { return `Jan 1900` })

    svgG.append('rect').exit().remove()

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
