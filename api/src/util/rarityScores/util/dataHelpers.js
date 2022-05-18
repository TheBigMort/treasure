"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wavelengthToColor = exports.calcChances = void 0;
const constants_1 = require("./constants");
function calcChances(_map, map = _map.sort()) {
    const total = map
        .valueSeq()
        .toArray()
        .reduce((p, n) => p + n);
    return map.map((val) => Math.round((val / total) * 100000) / 1000);
}
exports.calcChances = calcChances;
function wavelengthToColor(p) {
    let R;
    let G;
    let B;
    if (p < constants_1.rarityThresholds.uncommon) {
        R = 1;
        G = 1;
        B = 1;
    }
    else if (p >= constants_1.rarityThresholds.uncommon && p < constants_1.rarityThresholds.unique) {
        R = (-1 * (p - constants_1.rarityThresholds.unique)) / (constants_1.rarityThresholds.unique - constants_1.rarityThresholds.uncommon);
        G = 1;
        B = (-1 * (p - constants_1.rarityThresholds.unique)) / (constants_1.rarityThresholds.unique - constants_1.rarityThresholds.uncommon);
    }
    else if (p >= constants_1.rarityThresholds.unique && p < constants_1.rarityThresholds.epic) {
        R = 0;
        G = 1;
        B = (p - constants_1.rarityThresholds.unique) / (constants_1.rarityThresholds.epic - constants_1.rarityThresholds.unique);
    }
    else if (p >= constants_1.rarityThresholds.epic && p < constants_1.rarityThresholds.legend) {
        R = (p - constants_1.rarityThresholds.epic) / (constants_1.rarityThresholds.legend - constants_1.rarityThresholds.epic);
        G = (-1 * (p - constants_1.rarityThresholds.legend)) / (constants_1.rarityThresholds.legend - constants_1.rarityThresholds.epic);
        B = 1;
    }
    else if (p >= constants_1.rarityThresholds.legend && p < 100) {
        R = 1;
        G = 0;
        B = (-1 * (p - 100)) / (100 - constants_1.rarityThresholds.legend);
    }
    else {
        R = 0;
        G = 0;
        B = 0;
    }
    R = Math.round(R * 255);
    G = Math.round(G * 255);
    B = Math.round(B * 255);
    return `rgba(${R},${G},${B},1)`;
}
exports.wavelengthToColor = wavelengthToColor;
