function otsu(histogramCounts) {

    var sumB = 0,
        wB = 0,
        maximum = 0,
        total = histogramCounts.reduce((sum, e) => sum + e, 0),
        level = 0;

    var sum1 = histogramCounts.reduce((sum, e, i) => sum + i * e, 0);

    for (ii = 1; ii <= 256; ii++) {

        wB += histogramCounts[ii - 1];
        wF = total - wB;

        if (wB == 0 || wF == 0)
            continue;

        sumB = sumB + (ii - 1) * histogramCounts[ii - 1];
        mF = (sum1 - sumB) / wF;
        var between = wB * wF * ((sumB / wB) - mF) * ((sumB / wB) - mF);

        if (between >= maximum) {
            level = ii;
            maximum = between;
        }
    }

    return level;
}

module.exports = otsu;