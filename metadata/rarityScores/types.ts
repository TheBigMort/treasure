import { Map as IMap } from 'immutable';
import { MainCat, ModCat } from '../types';
export interface Scores {
    // mainItemTitle -> modCat -> modTitle -> occurences
    mainModTotals: IMap<string, IMap<ModCat, IMap<string | "None", number>>>;
    // mainCat -> mainItemTitle -> occurences
    mainItemTotals: IMap<MainCat, IMap<string, number>>;
    // fullItemTitle -> rarityScore
    itemScores: IMap<string, IChestItem>;
    chestScores: IMap<number, IChest>;
  }
  export type IScores = IMap<keyof Scores, Scores[keyof Scores]>;
  export type ChestItem = {
    item: string,
    mainCat: MainCat;
    mainItem: string;
    brokenDown: IMap<ModCat, string>;
    score?: number;
    color?: string;
    rank?: string;
  };
  export type IChestItem = IMap<keyof ChestItem, ChestItem[keyof ChestItem]>;
  
  
  export type Chest = {
    tokenId: number;
    items: IChestItem[]
    score: number;
    avgScore: number;
    rank?: number;
    avgRank?: number;
  }
  export type IChest = IMap<keyof Chest,Chest[keyof Chest]>;