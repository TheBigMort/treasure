import { List, Map as IMap } from "immutable";

export const modCats = ["POSSESSIVE", "EXTRA", "MATERIAL", "TAIL"] as const;
export const mainCats = [
  "HEAD",
  "TORSO",
  "FOOTWEAR",
  "BOTTOMS",
  "WEAPON",
  "SHIELD",
  "AMULET",
] as const;

export interface Mod {
  title: string[];
  weight: number[];
}
export interface Main extends Mod {
  extra: number[][];
  material: number[][];
}
export type Payload = {
  MOD: { [key in ModCat]: Mod };
  MAIN: { [key in MainCat]: Main };
};
export type Rarities = {
  [key in ModCat | MainCat]: List<{ title: string; rarity: number }>;
};
export type Rules = {
  [key in MainCat]: List<{
    title: string;
    extra: number[];
    material: number[];
  }>;
};
export type IPayload = IMap<keyof Payload, Payload[keyof Payload]>;
export type IMain = IMap<keyof Main, Main[keyof Main]>;
export type IMod = IMap<keyof Mod, Mod[keyof Mod]>;

export type ModCat = typeof modCats[number];
export type MainCat = typeof mainCats[number];

export type ChestItem = {
  item: string;
  brokenDown: { [key in ModCat]: string } | { [key in MainCat]: string };
};
export type IChestItem = IMap<keyof ChestItem, ChestItem[keyof ChestItem]>;

export type Chest = ChestItem[];
export type IChest = IChestItem[];
export type ItemStats = {
  cumTotal: number;
  percentTotal: number;
  percentCat: number;
  associated: IMap<
    ModCat | MainCat,
    IMap<string, IMap<"cumulative" | "percent", number>>
  >;
  items?: List<string>;
};

export type IStats = IMap<
  ModCat | MainCat,
  IMap<
    string,
    IMap<number | "All", IMap<keyof ItemStats, ItemStats[keyof ItemStats]>> &
      number
  >
>;
export type Analysis = IMap<
  MainCat | ModCat,
  IMap<
    string,
    IMap<"expected" | "actual", string | number | IMap<"All" | number, number>>
  >
>;
