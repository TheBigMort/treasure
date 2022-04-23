/* eslint-disable no-undef */
// import Chance from 'chance';
import Chance from 'chance';
import { Map as IMap } from 'immutable';
import Chests from '../genChests/chests';
import { compileRarities } from '../utils/csvUtils';

const numRuns: number = 10000;
const chance = new Chance();

describe('chests', () => {
    it('chests', async () => {
        const chests = new Chests(10000);
        await chests.generateChests();
    });
});
describe('rarities', () => {
    it('compile rarities', async () => {
        const nums = 100000;
        const data = <any>await compileRarities();
        console.log(data.toJS());
        /*         let totals = IMap();
        const chest = new Chests(1);
        for (let i = 0; i < nums; i += 1) {
            const item = chest.chanceHelper<string>(data);
            totals = totals.set(item, <number>totals.get(item, 0) + 1);
        }
        const final = totals.map((x) => <number>x / nums);
        console.log(totals.toJS());
        console.log(final.toJS()); */
    });
    it('modifiers', async () => {
        const headItems: IMap<string, number> = (<IMap<string, number>>(
            (await compileRarities()).getIn(['head', 'main'])
        )).sortBy((val) => val);

        let totals: IMap<string, number> = IMap();
        for (let i = 0; i < numRuns; i += 1) {
            const chosen: string = chance.weighted(
                headItems.keySeq().toArray(),
                headItems
                    .valueSeq()
                    .toArray()
                    .map((val) => val ** 1.5)
            );
            totals = totals.set(chosen, totals.get(chosen, 0) + 1);
        }
        totals = totals.sortBy((x) => x);
        const final = totals.map((x) => (x / numRuns) * 100).sortBy((x) => x);
        /*         console.log('percentages:');
        console.log(final.toJS());
        console.log(`Occurences in ${numRuns} events:`);
        console.log(totals.toJS()); */
    });
});

/* const headItems: IMap<string, number> = (<IMap<string, number>>(
    (await compileRarities()).getIn(['head', 'main'])
)).sortBy((val) => val);

let totals: IMap<string, number> = IMap();
for (let i = 0; i < numRuns; i += 1) {
    const chosen: string = chance.weighted(
        headItems.keySeq().toArray(),
        headItems
            .valueSeq()
            .toArray()
            .map((val) => val ** 1.5)
    );
    totals = totals.set(chosen, totals.get(chosen, 0) + 1);
}
totals = totals.sortBy((x) => x);
const final = totals.map((x) => (x / numRuns) * 100).sortBy((x) => x);
console.log('percentages:');
console.log(final.toJS());
console.log(`Occurences in ${numRuns} events:`);
console.log(totals.toJS()); */
