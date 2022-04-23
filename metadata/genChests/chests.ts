/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import Chance from 'chance';
import { List, Map as IMap } from 'immutable';
import { normalDist } from '../utils/chances';
import { categories, rarityMods } from '../utils/constants';
import Category from './category';
import { Cat } from './types';

const chance = new Chance();

export default class Chests {
    numItemsWeights: IMap<number, number> = IMap();

    seeds: IMap<number, number> = IMap();

    chests: IMap<number, any> = IMap();

    numChests: number;

    catTracker: IMap<Cat, number> = IMap();

    modClasses: IMap<Cat, Category> = IMap();

    constructor(collSize: number) {
        this.numItemsWeights = normalDist();
        this.seeds = this.getSeeds();
        this.numChests = collSize;
        categories.forEach((category: Cat) => {
            this.modClasses = this.modClasses.set(category, new Category(category));
        });
    }

    getSeeds = (): IMap<number, number> => {
        let temp: number = 0;
        return this.numItemsWeights
            .sortBy((v, k) => k)
            .map((val) => {
                temp += (Math.round(val * 10000) / 10000) * rarityMods.seeds.base;
                return 1 / (rarityMods.seeds.numeratorMult - temp);
            });
    };

    getSeed = (numItems: number): number => {
        const seed = this.seeds.get(numItems);
        if (!seed) throw Error(`seed not found for ${numItems}`);
        return <number>seed;
    };

    chanceHelper = <T>(iMap: IMap<T, number>): T =>
        chance.weighted(iMap.keySeq().toArray(), iMap.valueSeq().toArray());

    getNumItems = (): number => this.chanceHelper<number>(this.numItemsWeights);

    getCats = (numItems: number): List<Cat> => {
        let cats: List<Cat> = List([]);
        const catWeights: IMap<Cat, number> = IMap(
            categories.map((val): [Cat, number] => [val, 100])
        );
        for (let i = 0; i < numItems; i += 1) {
            /*             const cat: Cat = this.chanceHelper<Cat>(catWeights);
            catWeights = catWeights.set(
                cat,
                <number>catWeights.get(cat) -
                    Math.floor(100 / numItems) * rarityMods.categories.catChanceRedMult
            ); */
            const cat: Cat = 'head';
            cats = cats.push(cat);
            this.catTracker = this.catTracker.set(cat, this.catTracker.get(cat, 0) + 1);
        }
        return cats;
    };
    initializeClasses = async () => {
        await Promise.all(this.modClasses.valueSeq().map((catClass) => catClass.))

    }
    generateChests = async () => {
        for (let i = 0; i < this.numChests; i += 1) {
            const numItems = this.getNumItems();
            const seed = this.getSeed(numItems);
            const cats = this.getCats(numItems);
        }
    };
}
