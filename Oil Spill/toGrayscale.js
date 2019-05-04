var _ = require('lodash');

function toGrayscale(pixels) {

    var histogram = _.times(256, _.constant(0));

    var width = pixels.shape[0],
        height = pixels.shape[1];

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {

            var avg = Math.round((pixels.get(i, j, 0)
                + pixels.get(i, j, 1)
                + pixels.get(i, j, 2)) / 3);

            pixels.set(i, j, 0, avg);
            pixels.set(i, j, 1, avg);
            pixels.set(i, j, 2, avg);
            pixels.set(i, j, 3, 255);

            histogram[avg]++;

        }
    }

    return { pixels: pixels, histogram: histogram };

}

module.exports = toGrayscale;