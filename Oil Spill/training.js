var SVM = require('ml-svm');
const ConfusionMatrix = require('ml-confusion-matrix');

var options = {
    C: 0.01,
    tol: 10e-4,
    maxPasses: 10,
    maxIterations: 10000,
    kernel: 'rbf',
    kernelOptions: {
        sigma: 0.5
    }
};

var svm = new SVM(options);

var table = require('fs').readFileSync('./outputs/moments.csv').toString().split('\n');

var rawdata = table.splice(1, table.length - 2).map(e => e.split(','));

var data = rawdata.map(e => {
    return {
        class: e[0].substr(0, 1),
        moments: [
            parseFloat(e[1]) / (Math.pow(10, 6)),
            parseFloat(e[2]) / (Math.pow(10, 10)),
            parseFloat(e[3]) / (Math.pow(10, 11)),
            parseFloat(e[4]) / (Math.pow(10, 21)),
        ]
    }
})

var features = data.map(e => e.moments);
var labels = data.map(e => e.class == 'w' ? -1 : 1);

console.log('\nfeatures');
console.log(features);

console.log('\nlabels');
console.log(labels);

svm.train(features, labels);

console.log('\nTraining over, margins:');

var margins = svm.margin(features);

console.log(margins);

var test = ['wt.png', 'ot.png'];
console.log('\nTesting: ', test);


var res = svm.predict([features[2], features[7]]);
console.log(res);

//confusion matrix
console.log("confusion matrix")
const trueLabels =    [1,1]
const predictedLabels = res

 
// The order of the arguments are important !!!
const CM2 = ConfusionMatrix.fromLabels(trueLabels, predictedLabels);
console.log(CM2.getMatrix()); // 0.5
console.log("\nAccuracy\n");
console.log(CM2.getAccuracy()*100+"%");