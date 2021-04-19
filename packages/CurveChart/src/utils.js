// 将表格数据转化到图上
// tableColumns元素为["序号","xAxis","yAxis1","yAxis2","yAxis..."]
const tableData2Charts = function (tableData, tableColumns) {
    let xAxisData = []
    let seriesData = []
    let legendData = []

    let xKey = { title: tableColumns[1].title, key: tableColumns[1].field }
    let ykeys = []
    if (tableColumns) {
        for (let i = 2; i < tableColumns.length; i++) {
            ykeys.push({
                title: tableColumns[i].title,
                key: tableColumns[i].field
            })
            legendData.push(tableColumns[i].title)
        }
    }
    if (tableData) {
        for (let i = 0; i < tableData.length; i++) {
            xAxisData.push(tableData[i][xKey.key])
            if (i == 0) {
                for (let j = 0; j < ykeys.length; j++) {
                    seriesData.push({
                        name: ykeys[j].title,
                        type: "line",
                        data: [tableData[i][ykeys[j].key]]
                    })
                }
            } else {
                for (let j = 0; j < ykeys.length; j++) {
                    seriesData[j].data.push(tableData[i][ykeys[j].key])
                }
            }
        }
    }
    return {
        xAxisData: xAxisData,
        seriesData: seriesData,
        legendData: legendData
    }
}

export default {
    tableData2Charts
}