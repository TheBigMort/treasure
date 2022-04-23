/* eslint-disable no-undef */
// import Chance from 'chance';
import Chance from 'chance';
import { Map as IMap } from 'immutable';
import Chests from '../genChests/chests';

const numRuns: number = 10000;
const chance = new Chance();

describe('chests', () => {
    it('chests', async () => {
        const chests = new Chests(10000);
        await chests.generateChests();
    });
});
describe('rarities', () => {

    it('numItems', () => {
        const numItemWts: IMap<number, number> = IMap(Object.entries({
            '6': 1,
            '7': 2,
            '8': 10,
            '9': 28,
            '10': 65,
            '11': 122,
            '12': 174,
            '13': 200,
            '14': 174,
            '15': 122,
            '16': 65,
            '17': 28,
            '18': 10,
            '19': 2,
            '20': 1
          }).map(([key,val]): [number, number] => [parseInt(key), val]))
          const chests = new Chests(10000);
          let totals: IMap<number, number> = IMap();
          for (let i = 0; i < 10000; i++) {
              const chosen = chests.chanceHelper<number>(numItemWts);
              totals = totals.set(chosen, totals.get(chosen, 0) + 1)
          }
          console.log(totals.toJS())
        
    })
});