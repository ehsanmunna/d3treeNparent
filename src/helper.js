function getNewLink(linksData, multipleData) {
    var newLinks = [];
    for (let i = 0; i < linksData.length; i++) {
        const element = linksData[i];
        //find who have multiple parent
        var currentTargetPorcha = element.target.data.porchaNo;
        // check currentTargetPorcha has multiple value
        var hasMultipleValue = multipleData.filter(e => e.porchaNo === currentTargetPorcha).length > 0;
        if (hasMultipleValue) {
            // get sourct from parent
            var findFromMultipleData = multipleData.filter(c => c.porchaNo == currentTargetPorcha);
            for (let j = 0; j < findFromMultipleData.length; j++) {
                const elem = findFromMultipleData[j];
                var parentSource = linksData.filter(e => e.target.data.uuid === elem.parent);
                if (parentSource.length > 0) {
                    var parentSourceElem = parentSource[0].target;
                    newLinks.push({
                        source: parentSourceElem,
                        target: element.target
                    })
                }

            }

        }
    }
    // console.log(newLinks)
    return [...linksData, ...newLinks];
}

function getUniquAndMultipleData(data) {
    var uniqData = []
    var multipleData = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (uniqData.filter(e => e.porchaNo === element.porchaNo).length == 0) {
            uniqData.push(element)
        } else {
            multipleData.push(element);
        }
    }
    return {
        uniqData,
        multipleData
    }
}

function removeChildOf(uuid) {
    var childs = null;
    var parent = plaindata.filter(e => e.parent == null && e.uuid === uuid);
    if (parent.length > 0) {
        childs = parent;
    } else {
        childs = plaindata.filter(e => e.parent !== uuid);
        // finaly validate data and remove unnecessary data;
        var validData = [];
        childs.forEach(element => {
            var parentExist = childs.filter(e=> e.uuid == element.parent).length > 0;
            if (element.parent == null || parentExist) {
                validData.push(element);
            }
        });
        childs = validData;
    }
    // removeChildFromTree();
    return childs;
}

// function removeChildFromTree(uuid) {
//     var root = d3.stratify()
//         .id(function (d) { return d.uuid })
//         .parentId(function (d) { return d.parent })(plaindata);

//     var treeData = d3.tree()
//         .nodeSize([50, 150])
//         .size([400, 1000 - 160])
//         (root);
//     console.log(treeData)

// }

function addAllChildOf(uuid) {
    var childs = null;
    // var parent = plaindata.filter(e => e.parent == null && e.uuid === uuid);
    // if (parent.length > 0) {
    //     childs = parent;
    // } else {
    childs = plaindata.filter(e => e.parent === uuid);
    // }
    return childs;
}

