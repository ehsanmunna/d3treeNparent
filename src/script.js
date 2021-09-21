// var plaindata = require('.data.js')


(function () {

    var height = 300;
    var width = 800;
    var rectWidth = 150;
    var recthight = 50;

    // remove child of a parent test perpose
    // plaindata = removeChildOf(3)
    var data = getUniquAndMultipleData(plaindata);
    update(data.uniqData, data.multipleData);
    var plaindataCopy = JSON.parse(JSON.stringify(plaindata));
    function update(uniqData, multipleData) {
        var root = d3.stratify()
            .id(function (d) { return d.uuid })
            .parentId(function (d) { return d.parent })(uniqData);
        var treeData = d3.tree()
            .separation(function (a, b) { return (a.parent == b.parent ? 1 : 2); })
            .size([height - 100, width - 160])
            (root);
        var linksData = treeData.links();
        linksData = getNewLink(linksData, multipleData)
        var selection = d3.select("#khatian");
        var svg = selection.append("svg").attr("width", width).attr("height", height);
        renderRectangle(svg, treeData, rectWidth, recthight);
        renderLinks(svg, linksData, rectWidth, recthight);

        // var treeState = new Array();

        var allRect = d3.selectAll("#khatian").selectAll('rect');
        allRect
            .on('click', function (event, nodeData) {
                var id = nodeData.data.uuid;
                // if copy hase data and plaindata hase no data then its collaps
                if (hasChild(id, plaindataCopy).state && hasChild(id, plaindata).state) {
                    // plaindata = [...plaindata, ...hasChild(id).item]
                    plaindata = removeChildOf(id)
                }
                else {
                    plaindata = [...plaindata, ...hasChild(id, plaindataCopy).item]
                }



                var data = getUniquAndMultipleData(plaindata);
                d3.selectAll("#khatian").select('svg').remove()
                update(data.uniqData, data.multipleData);

                // console.log(data.uniqData)
                // console.log('treeState', treeState)
                console.log('plaindata', plaindata)
                console.log('plaindataCopy', plaindataCopy)
                console.log('has child', hasChild(nodeData.data.uuid, plaindataCopy));

            });

        function hasChild(id, items) {
            var child = items ? items.filter(e => e.parent == id) : [];
            return {
                state: child.length > 0,
                item: child
            }
        }
    }
})();

