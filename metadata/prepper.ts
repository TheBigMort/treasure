/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable no-continue */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import Chance from "chance";
import * as fs from "fs";
import Immutable, { fromJS, List, Map as IMap } from "immutable";
import formatWeights from "./batch";
import { predictOutcome, updateRating } from "./scripts/ratingAlgo";
import { Matchup } from "./scripts/ratingAlgo/types";
import { Main, MainCat, Mod, ModCat, modCats, Payload } from "./types";
import { adjWeights } from "./utils/adjRarities";
import { wtMaxValue } from "./utils/constants";
import { csv2json } from "./utils/csvUtils";

const files = [
  "head",
  "torso",
  "footwear",
  "bottoms",
  "weapon",
  "shield",
  "amulet",
  "possessive",
  "extra",
  "material",
  "tail",
];

const prompt = require("prompt-sync")();

const chance = new Chance();
const scaleTo = 10000000;
const rarestOccurances = 0.5;
// valid values 0-1
const precision = 0.6;
/**
 * spread modifies how rare the more common items are
 * in relation to the rare items.
 * ideal values: -100=100
 */
const spread: number = 100;

function getBestMatchup(
  items: string[],
  eloMap: IMap<string, number>
): Matchup {
  let bestMatchup: Matchup | any;
  for (let i = 0; i < items.length; i += 1) {
    let item = items[i];
    items.slice(i + 1).forEach((elem) => {
      const eloA = eloMap.get(item, items.length * 210);
      const eloB = eloMap.get(elem, items.length * 210);
      const newPrediction = predictOutcome(eloA, eloB);
      if (
        !bestMatchup ||
        Math.abs(newPrediction.prediction_a - newPrediction.prediction_b) <
          Math.abs(
            bestMatchup.prediction.prediction_a -
              bestMatchup.prediction.prediction_b
          )
      ) {
        bestMatchup = { itemA: item, itemB: elem, prediction: newPrediction };
      }
    });
  }
  return <Matchup>bestMatchup;
}
export async function getRarities(
  master: IMap<MainCat | ModCat, IMap<string, number>>
): Promise<void> {
  let allElos: IMap<MainCat | ModCat, IMap<string, number>> = IMap();
  let history = <IMap<string, IMap<string, string>>>(
    fromJS(
      JSON.parse(fs.readFileSync("./metadata/scripts/cache.json").toString())
    ).toMap()
  );
  for (let i = 0; i < files.length; i++) {
    const cat: MainCat | ModCat = <MainCat | ModCat>files[i].toUpperCase();
    if (cat === "AMULET") {
      continue;
    }
    let elos: IMap<string, number> = IMap();

    let rows: IMap<string, List<string>> = IMap();
    const data = await csv2json(`./metadata/in/${cat.toLowerCase()}.csv`);
    Object.entries(data.toJS()).forEach(([key, val]) => {
      console.log(key);

      elos = IMap();
      const mainArr = <string[]>val;
      mainArr.forEach((v) => {
        elos = elos.set(v, (<any[]>val).length * 210);
      });
      let bestMatchup: Matchup = getBestMatchup(mainArr, elos);
      do {
        bestMatchup = getBestMatchup(mainArr, elos);
        const aScore: number | undefined = <number | undefined>(
          master.getIn([cat, bestMatchup.itemA])
        );
        const bScore: number | undefined = <number | undefined>(
          master.getIn([cat, bestMatchup.itemB])
        );

        const last: string | undefined =
          !aScore || !bScore
            ? undefined
            : aScore < bScore
            ? bestMatchup.itemA
            : bestMatchup.itemB;
        /*         const last: string | undefined = <string | undefined>(
          history.getIn([bestMatchup.itemA, bestMatchup.itemB], undefined)
        ); */
        if (last) {
          elos = elos.set(
            bestMatchup.itemA,
            updateRating(
              bestMatchup.prediction.rating_a,
              bestMatchup.itemA === last ? 1 : 0,
              bestMatchup.prediction.prediction_a
            ).newRating
          );
          elos = elos.set(
            bestMatchup.itemB,
            updateRating(
              bestMatchup.prediction.rating_b,
              bestMatchup.itemB === last ? 1 : 0,
              bestMatchup.prediction.prediction_b
            ).newRating
          );
          continue;
        }
        console.log("Select the one most rare:");
        console.log(`1) ${bestMatchup.itemA}`);
        console.log(`2) ${bestMatchup.itemB}`);
        console.log(`3) Tie`);
        console.log(`4) See Results`);

        let response: number = parseInt(prompt(), 10);
        //let response: number = 3;

        if (
          response !== 1 &&
          response !== 2 &&
          response !== 3 &&
          response !== 4
        ) {
          console.log(`Incorrect Response: ${response}. Try again`);
          continue;
        }
        if (response === 4) break;
        if (response === 3) {
          response = chance.integer({ min: 1, max: 2 });
        }
        elos = elos.set(
          bestMatchup.itemA,
          updateRating(
            bestMatchup.prediction.rating_a,
            response === 1 ? 1 : 0,
            bestMatchup.prediction.prediction_a
          ).newRating
        );
        elos = elos.set(
          bestMatchup.itemB,
          updateRating(
            bestMatchup.prediction.rating_b,
            response === 2 ? 1 : 0,
            bestMatchup.prediction.prediction_b
          ).newRating
        );
        let nested: IMap<string, string> = history.get(
          bestMatchup.itemA,
          IMap()
        );
        nested = nested.set(
          bestMatchup.itemB,
          response === 1 ? bestMatchup.itemA : bestMatchup.itemB
        );

        history = history.set(bestMatchup.itemA, nested);
      } while (
        Math.abs(
          bestMatchup.prediction.prediction_a -
            bestMatchup.prediction.prediction_b
        ) <= precision
      );
      // Math.abs(bestMatchup.prediction.prediction_a-bestMatchup.prediction.prediction_b)<=precision
      // console.log(bestMatchup.prediction)
      elos = elos.sort();
      elos = elos.map((elo, _, iter) =>
        Math.abs(elo - (iter.min()! / 100) * spread + 1)
      );
      elos = adjWeights(
        elos,
        rarestOccurances / ((elos.size / 75) * 130000),
        scaleTo
      );

      console.log(
        elos
          .sort()
          .map(
            (elo, _, iter) =>
              Math.round(
                (elo /
                  iter
                    .valueSeq()
                    .toArray()
                    .reduce((p, n) => p + n)) *
                  1000000
              ) / 10000
          )
          .toJS()
      );

      allElos = allElos.set(cat, elos);
    });
  }

  fs.writeFileSync(
    "./metadata/scripts/cache.json",
    JSON.stringify(history.toJS(), null, 3)
  );
  fs.writeFileSync(
    "./metadata/out/master.json",
    JSON.stringify(allElos.toJS(), null, 3)
  );
}

async function getRules(): Promise<
  IMap<MainCat, IMap<string, { extra: string[]; material: string[] }>>
> {
  let allRules: IMap<
    MainCat,
    IMap<string, { extra: string[]; material: string[] }>
  > = IMap();
  const mods: IMap<ModCat, List<string>> = await getMods();
  const extras: List<string> = mods.get("EXTRA")!;
  const materials: List<string> = mods.get("MATERIAL")!;

  for (let i = 0; i < files.length; i++) {
    if ((Array.from(modCats) as string[]).includes(files[i].toUpperCase()))
      continue;
    const cat: MainCat = <MainCat>files[i].toUpperCase();

    const itemRules: IMap<string, { extra: string[]; material: string[] }> = (
      await csv2json(`./metadata/in/rules/${cat.toLowerCase()}.csv`)
    ).map((val) => {
      let e: string[] = [];
      let m: string[] = [];
      val.forEach((v) => {
        if (extras.contains(v)) {
          e.push(v);
        }
        if (materials.contains(v)) {
          m.push(v);
        }
      });
      return {
        extra: e,
        material: m,
      };
    });
    allRules = allRules.set(cat, itemRules);
  }
  return allRules;
}

async function getMods(): Promise<IMap<ModCat, List<string>>> {
  let mods: IMap<ModCat, List<string>> = IMap();
  let mcs: string[] = Array.from(modCats) as string[];
  for (let i = 0; i < mcs.length; i++) {
    const mapped: IMap<string, List<string>> = await csv2json(
      `./metadata/in/${mcs[i].toLowerCase()}.csv`
    );
    mods = mods.set(<ModCat>mcs[i], mapped.valueSeq().toArray()[0]);
    if (mods.get(<ModCat>mcs[i], List([])).count() < 2)
      throw Error("mod list not found");
  }
  return mods;
}
export default async function prepper(): Promise<Payload> {
  let payload: IMap<
    "MOD" | "MAIN",
    IMap<ModCat | MainCat, Mod | Main>
  > = IMap();
  let modIds: IMap<"EXTRA" | "MATERIAL", IMap<string, number>> = IMap();
  const rarities: IMap<MainCat | ModCat, IMap<string, number>> = <
    IMap<MainCat | ModCat, IMap<string, number>>
  >(<unknown>(
    IMap(
      Immutable.fromJS(
        JSON.parse(fs.readFileSync("./metadata/out/master.json").toString())
      )
    )
  ));
  const rules: IMap<
    MainCat,
    IMap<string, { extra: string[]; material: string[] }>
  > = <IMap<MainCat, IMap<string, { extra: string[]; material: string[] }>>>(
    await getRules()
  );
  (Array.from(modCats) as string[]).forEach((modCat) => {
    let titles: string[] = [];
    let weights: number[] = [];

    rarities
      .get(<ModCat>modCat)!
      .entrySeq()
      .forEach(([k, v], index) => {
        if (modCat === "EXTRA" || modCat === "MATERIAL") {
          modIds = modIds.setIn([modCat, k], index);
        }
        titles.push(k);
        weights.push(v);
      });
      if (!(modCat === "EXTRA" || modCat === "MATERIAL")) {
        weights = formatWeights(weights);
      }
    

    if (titles.length !== weights.length)
      throw Error(
        `length mismatch.\nCat: ${modCat}\nTitles: ${titles.length}\nWeights:${weights.length}`
      );
    for (let i = 0; i < titles.length; i++) {
      if (!titles[i] || titles[i].length < 2)
        throw Error(`Invalid title.\nCat: ${modCat}\nTitle: ${titles[i]}`);
      if (!weights[i] || weights[i] < 1 || weights[i] > wtMaxValue)
        throw Error(`Invalid weight.\nCat: ${modCat}\nWeight: ${weights[i]}`);
    }
    payload = payload.setIn(["MOD", modCat], {
      title: titles,
      weight: weights,
      extra: [],
      material: [],
    });
  });
  rules.forEach((val, key) => {
    let titles: string[] = [];
    let weights: number[] = [];
    let extras: number[][] = [];
    let materials: number[][] = [];
    val.forEach((v, k) => {
      let tit: string = k;
      let wt: number =
        key === "AMULET" ? scaleTo : <number>rarities.getIn([key, k])!;
      let ei: number[] = <number[]>(
        v.extra
          .map((e) => modIds.getIn(["EXTRA", e]))
          .filter((elem) => elem || elem === 0)
      );
      let mi: number[] = <number[]>(
        v.material
          .map((m) => modIds.getIn(["MATERIAL", m]))
          .filter((elem) => elem || elem === 0)
      );

      if (ei.length !== v.extra.length || mi.length !== v.material.length) {
        console.log(`ei.length: ${ei.length}`);
        console.log(`mi.length: ${mi.length}`);
        console.log(`v.extra.length: ${v.extra.length}`);
        console.log(`v.material.length: ${v.material.length}`);

        throw Error("array length mismatch");
      }
      titles.push(tit);
      weights.push(wt);
      extras.push(ei);
      materials.push(mi);
    });
    if (
      titles.length !== weights.length ||
      titles.length !== extras.length ||
      titles.length !== materials.length
    )
      throw Error(
        `length mismatch.\nCat: ${key}\nTitles: ${titles.length}\nWeights:${weights.length}\nExtras: ${extras.length}\nMaterials: ${materials.length}`
      );
    weights = formatWeights(weights);
    for (let i = 0; i < titles.length; i++) {
      if (!titles[i] || titles[i].length < 2)
        throw Error(`Invalid title.\nCat: ${key}\nTitle: ${titles[i]}`);
      if (!weights[i] || weights[i] < 1 || weights[i] > wtMaxValue)
        throw Error(`Invalid weight.\nCat: ${key}\nWeight: ${weights[i]}`);
      extras[i].forEach((e) => {
        if ((!e && e !== 0) || e < 0)
          throw Error(`Invalid extra.\nCat: ${key}\nExtra: ${e}`);
      });
      materials[i].forEach((m) => {
        if ((!m && m !== 0) || m < 0)
          throw Error(`Invalid material.\nCat: ${key}\nMaterial: ${m}`);
      });
      if (extras[i].length < 1 || materials[i].length < 1)
        throw Error(`no mods found for ${titles[i]}`);
    }
    payload = payload.setIn(["MAIN", key], <Main>{
      title: titles,
      weight: weights,
      extra: extras,
      material: materials,
    });
  });
  fs.writeFileSync(
    "./metadata/out/prep_cache.json",
    JSON.stringify(<Payload>payload.toJS(), null, 3)
  );
  return <Payload>payload.toJS();
}
/* (async () => {
  const master: IMap<MainCat | ModCat, IMap<string, number>> = IMap<
    MainCat | ModCat,
    IMap<string, number>
  >(JSON.parse(fs.readFileSync("./metadata/in/master.json").toString()));
  await getRarities(master);
  console.log('finished')
})(); */
