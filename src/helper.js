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
                var parentSourceElem = parentSource[0].target;
                newLinks.push({
                    source: parentSourceElem,
                    target: element.target
                })
            }

        }
    }
    console.log(newLinks)
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

function removeChildOf(uuid){
    var childs = plaindata.filter(e=> e.parent !== uuid);
    // for (let i = 0; i < childs.length; i++) {
    //     const element = childs[i];
        
    // }
    console.log(childs)
    return childs;
}