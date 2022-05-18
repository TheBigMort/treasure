/* eslint-disable import/prefer-default-export */
import { Map as IMap } from 'immutable';
import { rarityThresholds as pr } from './constants';

function calcChances<T>(
    _map: IMap<T, number>,
    map: IMap<T, number> = _map.sort()
): IMap<T, number> {
    const total = map
        .valueSeq()
        .toArray()
        .reduce((p, n) => p + n);
    return map.map((val) => Math.round((val / total) * 100000) / 1000);
}
function wavelengthToColor(p: number): string {
    let R;
    let G;
    let B;

    if (p < pr.uncommon) {
        R = 1;
        G = 1;
        B = 1;
    } else if (p >= pr.uncommon && p < pr.unique) {
        R = (-1 * (p - pr.unique)) / (pr.unique - pr.uncommon);
        G = 1;
        B = (-1 * (p - pr.unique)) / (pr.unique - pr.uncommon);
    } else if (p >= pr.unique && p < pr.epic) {
        R = 0;
        G = 1;
        B = (p - pr.unique) / (pr.epic - pr.unique);
    } else if (p >= pr.epic && p < pr.legend) {
        R = (p - pr.epic) / (pr.legend - pr.epic);
        G = (-1 * (p - pr.legend)) / (pr.legend - pr.epic);
        B = 1;
    } else if (p >= pr.legend && p < 100) {
        R = 1;
        G = 0;
        B = (-1 * (p - 100)) / (100 - pr.legend);
    } else {
        R = 0;
        G = 0;
        B = 0;
    }
    R = Math.round(R * 255);
    G = Math.round(G * 255);
    B = Math.round(B * 255);

    return `rgba(${R},${G},${B},1)`;
}
export { calcChances, wavelengthToColor };
