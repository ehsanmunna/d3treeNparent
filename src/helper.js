function getNewLink(linksData, multipleData){
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
    return [...linksData, ...newLinks];
}