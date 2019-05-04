var vega = require('vega');
var fs = require('fs');
var chartSpec = fs.readFileSync('./chartTemplate.json');

var chartData = JSON.parse(chartSpec);

async function saveChart(histogram, filename) {

    try {

        chartData.data[0].values = histogram.map((e, i) => {
            return { category: i, amount: e }
        })
        
        var view = new vega.View(vega.parse(chartData), { renderer: 'none' });

        var svg = await view.toSVG();

        fs.writeFile(`${filename}.svg`, svg)

    } catch (e) {
        console.log(e);
    }
}

module.exports = saveChart;