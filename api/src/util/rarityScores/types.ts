import { Map as IMap } from 'immutable';

export const modCats = ['POSSESSIVE', 'EXTRA', 'MATERIAL', 'TAIL'] as const;
export const mainCats = [
    'HEAD',
    'TORSO',
    'FOOTWEAR',
    'BOTTOMS',
    'WEAPON',
    'SHIELD',
    'AMULET',
] as const;

export type ModCat = typeof modCats[number];
export type MainCat = typeof mainCats[number];
export type ChestItem = {
    item: string;
    mainCat: MainCat;
    mainItem: string;
    brokenDown: IMap<ModCat & 'TOTAL', string>;
    score?: number;
    color?: string;
    rank?: string;
};
export type IChestItem = IMap<keyof ChestItem, ChestItem[keyof ChestItem]>;

export type Chest = {
    tokenId: number;
    items: IChestItem[];
    score: number;
    avgScore: number;
    color?: string;
    rank?: number;
    avgRank?: number;
};

export type IChest = IMap<keyof Chest, Chest[keyof Chest]>;

export interface Scores {
    // mainItemTitle -> modCat -> modTitle -> occurences
    mainModTotals: IMap<string, IMap<ModCat | 'TOTAL', IMap<string | 'None' | number, number>>>;
    // mainCat -> mainItemTitle -> occurences
    mainItemTotals: IMap<MainCat, IMap<string, number>>;
    numModTotals: IMap<number, number>;
    // fullItemTitle -> rarityScore
    itemScores: IMap<string, IChestItem>;
    chestScores: IMap<number, IChest>;
}
export type IScores = IMap<keyof Scores, Scores[keyof Scores]>;
