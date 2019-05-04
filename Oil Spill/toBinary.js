var otsu = require('./otsu');

function toBinary(pixels, histogram) {
    
    var width = pixels.shape[0],
        height = pixels.shape[1];

    var threshold = otsu(histogram);

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {

            var intensity = pixels.get(i, j, 0);
            out = (intensity >= threshold) ? 255 : 0;

            pixels.set(i, j, 0, out);
            pixels.set(i, j, 1, out);
            pixels.set(i, j, 2, out);
            pixels.set(i, j, 3, 255);

        }
    }

    return (pixels);
}

module.exports = toBinary;