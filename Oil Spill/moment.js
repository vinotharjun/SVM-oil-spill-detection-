function moment(p, q, pixels) {

    var width = pixels.shape[0],
        height = pixels.shape[1];

    var sum = 0;

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {

            if (pixels.get(i, j, 0) == 255)
                sum += Math.pow(i, p) * Math.pow(j, q);

        }
    }

    return(sum);
}

module.exports = moment;