// var plaindata = require('.data.js')


(function () {

    // Configurations
    var height = 500;
    var width = 1000;
    var rectWidth = 100;
    var recthight = 75;
    var nodeGap = rectWidth + 50;
    var renderLevel = 2;

    // Separate data for node and link
    var data = getUniquAndMultipleData(plaindata);
    // Call Update
    update(data.uniqData, data.multipleData);
    var plaindataCopy = JSON.parse(JSON.stringify(plaindata));
    /**
     * Main function to create/update tree
     * @param {*} uniqData Input unique data to generate data
     * @param {*} multipleData Imput multiple data to create link for multiple parent
     */
    function update(uniqData, multipleData) {
        var root = d3.stratify()
            .id(function (d) { return d.uuid })
            .parentId(function (d) { return d.parent })(uniqData);
        var treeData = d3.tree()
            // .nodeSize([50, 150])
            .size([height - 100, width - 160])
            (root);
        // treeData.forEach(function(d) {
        //     d.y = (d.depth === 0 ? 50 : d.depth * 200);
        //   })
        chengeCord(treeData)
        function chengeCord(d) {
            // d = changeDepth(d);
            d.y = (d.depth === 0 ? 10 : d.depth * nodeGap);
            if (d.children && d.children.length > 0) {
                for (let i = 0; i < d.children.length; i++) {
                    const element = d.children[i];
                    chengeCord(element);
                }
            }
        }
        // function changeDepth(d) {
        //     if (d.data.porchaNo === 1300) {
        //         d.depth += 1
        //     }
        //     return d;
        // }
        var linksData = treeData.links();
        linksData = getNewLink(linksData, multipleData)
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

