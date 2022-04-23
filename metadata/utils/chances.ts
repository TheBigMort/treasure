/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import { Map as IMap } from 'immutable';

function normalDist(): IMap<number, number> {
    function randn_bm(min: number, max: number, skew: number): number {
        let u = 0;
        let v = 0;
        while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
        while (v === 0) v = Math.random();
        let num = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);

        num = num / 10.0 + 0.5; // Translate to 0 -> 1

        if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range

        num **= skew; // Skew
        num *= max - min; // Stretch to fill range
        num += min; // offset to min
        return Math.round(num);
    }
    const numRuns = 100000;
    let totals: IMap<number, number> = IMap();

    for (let i = 0; i < numRuns; i += 1) {
        const result = randn_bm(6, 20, 1);
        totals = totals.set(result, totals.get(result, 0) + 1);
    }
    const final = totals.map((x) => (x / numRuns) ** (1 / 2) * 100).sortBy((x) => x);
    const total = final.reduce((red: number, val: number) => red + val);

    return final.map((x) => x / total);
}
export { normalDist };
