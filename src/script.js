(function () {
    
    var plaindata = [
        { uuid: 1, porchaNo: 502, parent: null },
        { uuid: 2, porchaNo: 503, parent: 1 },
        { uuid: 3, porchaNo: 504, parent: 2 },
        { uuid: 4, porchaNo: 506, parent: 2 },
        { uuid: 5, porchaNo: 507, parent: 2 },
        { uuid: 6, porchaNo: 505, parent: 1 },
        { uuid: 7, porchaNo: 506, parent: 6 },
        { uuid: 8, porchaNo: 508, parent: 5 },
        { uuid: 8, porchaNo: 508, parent: 3 },
    ]

    var uniqData = []
    var multipleData = []
    for (let i = 0; i < plaindata.length; i++) {
        const element = plaindata[i];
        if (uniqData.filter(e=> e.porchaNo === element.porchaNo).length == 0) {
            uniqData.push(element)
        } else {
            multipleData.push(element);
        }
    }

    var height = 300;
    var width = 800;
    var rectWidth = 150;
    var recthight = 50;
    var root = d3.stratify()
        .id(function (d) { return d.uuid })
        .parentId(function (d) { return d.parent })(uniqData);
    var treeData = d3.tree()
        .separation(function (a, b) { return (a.parent == b.parent ? 1 : 2); })
        .size([height - 100, width - 160])
        (root);

    var linksData = treeData.links();
    var newLinks = [];
    for (let i = 0; i < linksData.length; i++) {
        const element = linksData[i];
        //find who have multiple parent
        var currentTargetPorcha = element.target.data.porchaNo;
        // check currentTargetPorcha has multiple value
        var hasMultipleValue = multipleData.filter(e=> e.porchaNo === currentTargetPorcha).length > 0;
        if (hasMultipleValue) {
            // get sourct from parent
            var findFromMultipleData = multipleData.find(c=> c.porchaNo == currentTargetPorcha);
            var parentSource = linksData.filter(e=> e.target.data.uuid === findFromMultipleData.parent)
            newLinks.push({
                source: parentSource[0].target,
                target: element.target
            })
        }
    }
    linksData = [...linksData, ...newLinks]

    
    var selection = d3.select("#khatian")
    // Add svg
    var svg = selection.append("svg").attr("width", width).attr("height", height);
    renderRectangle(svg);
    renderLinks(svg);

    /* funcations */

    function renderRectangle(svg) {
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


    function renderLinks(svg) {
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
})();

