var getPixels = require('util').promisify(require('get-pixels'));
var savePixels = require("save-pixels");
var fs = require('fs');
var toGrayscale = require('./toGrayscale');
var toBinary = require('./toBinary');
var moment = require('./moment');
var saveChart = require('./saveChart');


function writeToFile(filename, data) {
    fs.writeFileSync(filename, null);
    var writeStream = fs.createWriteStream(filename);
    savePixels(data, "png").pipe(writeStream);
}

async function getMoments(filename) {

    var pixels = await getPixels('inputs/' + filename);

    var output = toGrayscale(pixels);
    pixels = output.pixels;
    var histogram = output.histogram;
    writeToFile('outputs/grayscale/' + filename, pixels);

    await saveChart(histogram,'outputs/histograms/'+filename)

    pixels = toBinary(pixels, histogram);
    writeToFile('outputs/binary/' + filename, pixels);

    var u00 = moment(0, 0, pixels),
        u11 = moment(1, 1, pixels),
        u20 = moment(2, 0, pixels),
        u02 = moment(0, 2, pixels),
        u12 = moment(1, 2, pixels),
        u21 = moment(2, 1, pixels),
        u30 = moment(3, 0, pixels),
        u03 = moment(0, 3, pixels);

    var area = u00,
        mean = u11,
        i1 = u20 + u02,
        i2 = Math.pow(u20 + u02, 2) + 4 * Math.pow(u11, 2),
        i3 = Math.pow(u30 - 3 * u12, 2) + Math.pow(3 * u21 - u03, 2),
        i4 = Math.pow(u30 + u12, 2) + Math.pow(u21 + u03, 2);

    return ([filename, area, mean, i1, i2, i3, i4].join() + "\n");

}

async function start() {
    var files = fs.readdirSync('./inputs');
    var str = await files.reduce(async function (acc, e) { return await acc + await getMoments(e) }, "");
    fs.writeFileSync('outputs/moments.csv',
        'image, area, mean, I1, I2, I3, I4\n' + str);
}

start();