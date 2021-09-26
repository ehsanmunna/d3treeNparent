// var plaindata = require('.data.js')


(function () {

    var height = 500;
    var width = 1000;
    var rectWidth = 100;
    var recthight = 75;
    var nodeGap = rectWidth + 50;

    
    update(plaindata);
    function update(uniqData) {
        var root = d3.stratify()
            .id(function (d) { return d.uuid })
            .parentId(function (d) { 
                console.log('inside parentId of stratify ', d)
                return d.parent 
            })(uniqData);
        console.log(root)
        var treeData = d3.tree()
        .nodeSize([50,150])
            .size([height - 100, width - 160])
            (root);
        console.log(treeData)
        var linksData = treeData.links();
        console.log(linksData)
        var selection = d3.select("#khatian");
        var svg = selection.append("svg").attr("width", width).attr("height", height);

        renderRectangle(svg, treeData, rectWidth, recthight);
        renderLinks(svg, linksData, rectWidth, recthight);
        // var t = d3.transition()
        // .duration(750)
        // .ease(d3.easeLinear)
        // var treeState = new Array();

        var allRect = d3.selectAll("#khatian").selectAll('foreignObject');
        // allRect.transition(t)
        allRect.on('click', toggleChild);

        function toggleChild(event, nodeData) {
            var id = nodeData.data.uuid;
            // if copy hase data and plaindata hase no data then its collaps
            var hasChildFromCopy = hasChild(id, plaindataCopy);
            if (hasChildFromCopy.state && hasChild(id, plaindata).state) {
                plaindata = removeChildOf(id);
            }
            else {
                plaindata = [...plaindata, ...hasChildFromCopy.item];
            }

            var data = getUniquAndMultipleData(plaindata);
            d3.selectAll("#khatian").select('svg').remove()
            update(data.uniqData, data.multipleData);

            // console.log('plaindata', plaindata)
            // console.log('plaindataCopy', plaindataCopy)
            // console.log('has child', hasChild(nodeData.data.uuid, plaindataCopy));

        }
        function hasChild(id, items) {
            var child = items ? items.filter(e => e.parent == id) : [];
            return {
                state: child.length > 0,
                item: child
            }
        }
    }
})();

