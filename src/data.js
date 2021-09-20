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
    if (uniqData.filter(e => e.porchaNo === element.porchaNo).length == 0) {
        uniqData.push(element)
    } else {
        multipleData.push(element);
    }
}

