// var plaindata = require('.data.js')


(function () {

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
    linksData = getNewLink(linksData, multipleData)

    
    var selection = d3.select("#khatian")
    // Add svg
    var svg = selection.append("svg").attr("width", width).attr("height", height);
    renderRectangle(svg, treeData, rectWidth, recthight);
    renderLinks(svg, linksData, rectWidth, recthight);
    
})();

