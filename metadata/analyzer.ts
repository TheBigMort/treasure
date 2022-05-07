import * as fs from "fs";
import { List, Map as IMap } from "immutable";
import { default as prepCache, default as prepped } from "../items";
import {
  Analysis,
  Chest,
  ChestItem,
  IStats,
  ItemStats,
  MainCat,
  mainCats,
  ModCat
} from "./types";
const chestBaseDir = "./metadata/in/chests";

let total = 0;

function analyzer(): Chest[] {
  const itemBreakdown = (itemStr: string): ChestItem => {
    let splits: string[] = itemStr.split(" of ");
    let tail: string = "";
    let rest: string = "";
    if (splits.length > 1) {
      if (splits.length > 2)
        throw Error(`more than one tail detected: ${itemStr}`);
      tail = ` of ${splits[1]}`;
      rest = splits[0];
    } else {
      rest = itemStr;
    }
    let mainItem: string;
    let itemMap: IMap<MainCat | ModCat, List<string>> = IMap(
      List(
        Object.entries(prepCache.MAIN).map(
          ([k, v]): [MainCat | ModCat, List<string>] => [
            <MainCat | ModCat>k,
            List(v.title),
          ]
        )
      ).concat(
        Object.entries(prepCache.MOD).map(
          ([k, v]): [MainCat | ModCat, List<string>] => [
            <MainCat | ModCat>k,
            List(v.title),
          ]
        )
      )
    );
    let temp = rest.trim().split(" ");
    if (temp[0] === "Rich" && temp[1] === "Man's") {
      temp = [[temp[0], temp[1]].join(" "), ...temp.slice(2)];
    }
    let broken: IMap<MainCat | ModCat, string> = IMap(
      temp
        .concat(tail)
        .filter((str) => str.length > 0)
        .map((part, _, arr): [MainCat | ModCat, string] => {
          const found: [MainCat | ModCat, List<string>] | undefined =
            itemMap.findEntry((val) => val.contains(part.trim()));
          if (!found)
            throw Error(
              `element not found.\nItem: ${itemStr}\nPart:${part}\n${arr}`
            );
          if ((<string[]>Array.from(mainCats)).includes(found[0])) {
            mainItem = part;
          }
          return [found[0], part.trim()];
        })
    );
    return <ChestItem>{
      item: itemStr,
      brokenDown: broken.toJS(),
    };
  };
  const fileNames: string[] = fs
    .readdirSync(chestBaseDir)
    .filter((fn) => fn.endsWith(".json"));
  let chests: IMap<string, Chest[]> = IMap();
  fileNames.forEach((file: string) => {
    const items: string[][] = <string[][]>(
      JSON.parse(fs.readFileSync(`${chestBaseDir}/${file}`).toString())
    );
    chests = chests.set(
      file,
      items.map((chest: string[]): Chest => {
        return <Chest>(
          chest.map((item): ChestItem => <ChestItem>itemBreakdown(item))
        );
      })
    );
  });
  fs.writeFileSync(
    "./metadata/out/analyzed.json",
    JSON.stringify(chests.toJS(), null, 3)
  );
  return List([])
    .concat(...chests.valueSeq().toArray())
    .toArray();
}
function getStats(): IStats {
  let stats: IStats = IMap();
  let totals: IMap<number, number> = IMap();
  let repeats: IMap<string, number> = IMap();
  let chestReps: IMap<List<string>, IMap<string, number>> = IMap();
  analyzer().forEach(addItem);
  console.log(repeats.filter((val) => val > 1).reduce((p, n) => p + n));
  console.log(totals.toJS());
  fs.writeFileSync(
    "./test/reports/repeats.json",
    JSON.stringify(
      repeats
        .filter((val) => val > 1)
        .sort()
        .toJS(),
      null,
      3
    )
  );
  fs.writeFileSync(
    "./test/reports/analyzed_chests2.json",
    JSON.stringify(
      stats.map((val) => IMap({ Category: val.get("Category") })).toJS(),
      null,
      3
    )
  );
  return stats;

  function addItem(c: Chest): void {
    totals = totals.update(c.length, 0, (v) => <number>v + 1);
    let allItems: List<string> = List(
      c.map((chest: ChestItem): string => chest.item)
    );
    let countMap: IMap<string, number> = allItems.countBy((val) => val);
    if (<number>countMap.max() > 1) {
      chestReps = chestReps.set(allItems, countMap);
    }
    c.forEach((item: ChestItem) => {
      let mapped: IStats = _addItem(item);

      stats = stats.mergeDeepWith(
        (oldVal, newVal) => <number>oldVal + <number>newVal,
        mapped
      );
    });
    function _addItem(ci: ChestItem): IStats {
      repeats = repeats.update(ci.item, 0, (v) => <number>v + 1);
      let nm: IStats = IMap();
      Object.entries(ci.brokenDown).forEach(([key, val], _, arr) => {
        let p: [ModCat | MainCat, string, number] = [
          <ModCat | MainCat>key,
          val,
          c.length,
        ];
        arr
          .filter(([k, v]) => v !== val)
          .forEach(([k, v]) => {
            nm = nm.updateIn(
              [...p, "associated", k, v, "cumulative"],
              0,
              (v) => <number>v + 1
            );
          });
        nm = nm.updateIn([...p, "cumTotal"], 0, (v) => <number>v + 1);
        nm = nm.updateIn([key, "Category"], 0, (v) => <number>v + 1);
        nm = nm;
        if ((<string[]>Array.from(mainCats)).includes(key)) {
          total += 1;
          nm = nm.updateIn([...p, "items"], <List<string>>List([]), (v) =>
            (<List<string>>v).push(ci.item)
          );
        }
        nm = nm.setIn(
          [key, val, "All"],
          <IMap<keyof ItemStats, ItemStats[keyof ItemStats]>>(
            nm.getIn([...p], IMap())
          )
        );
      });

      return <IStats>(
        IMap().mergeDeepWith(
          (oldVal, newVal) => <number>oldVal + <number>newVal,
          nm
        )
      );
    }
  }
}

async function getCumStats() {
  const stats = getStats();

  let anal: Analysis = IMap();
  const totals: IMap<number, number> = <IMap<number, number>>IMap(
    Object.entries({
      "8": 119,
      "9": 306,
      "10": 648,
      "11": 1248,
      "12": 1775,
      "13": 1906,
      "14": 1673,
      "15": 1197,
      "16": 714,
      "17": 300,
      "18": 114,
    }).map(([k, v]) => [parseInt(k), v])
  );
  let totalsMax = ((): number => {
    let tuple: [number, number] = <[number, number]>(
      totals.findEntry((val, key) => val === totals.maxBy((v, k) => v * k))
    );
    return tuple[0] * tuple[1];
  })();
  Object.keys(prepped).forEach((bigCat) => {
    Object.entries(prepped[<"MAIN" | "MOD">bigCat]).forEach(([key, val]) => {
      const len = val.title.length;
      for (let i = 0; i < len; i++) {
        let title = val.title[i];
        let path: [MainCat | ModCat, string] = [<MainCat | ModCat>key, title];
        let atPath = <
          IMap<
            number | "All",
            IMap<keyof ItemStats, ItemStats[keyof ItemStats]>
          >
        >stats.getIn(path);
        if (!atPath) {
          continue;
        }
        let total = 0;

        let totPerc: IMap<number | "All", number> = atPath
          .filter((v) => typeof v === typeof IMap())
          .map((v, numItems) => {
            const denom =
              typeof numItems === typeof "string"
                ? totals
                    .valueSeq()
                    .toArray()
                    .map((val, index) => val * (index + 8))
                    .reduce((prev, n) => prev + n)
                : <number>totals.get(<number>numItems) * <number>numItems;
            if (typeof numItems === typeof "string") {
              total = <number>v.get("cumTotal");
            }
            return (
              Math.round(
                (<number>atPath.getIn([numItems, "cumTotal"]) /
                  <number>atPath.getIn(["All", "cumTotal"])) *
                  100000
              ) / 1000
            );
          });

        let percs: IMap<number | "All", number> = calcChances(
          totPerc
            .filter((_, key) => key !== "All")
            .map(
              (val, key) =>
                val *
                (totalsMax / (<number>key * <number>totals.get(<number>key)))
            )
        );
        let cums: IMap<number | "All", number> = atPath
          .filter((v) => typeof v === typeof IMap())
          .map((v, numItems) => {
            return <number>v.get("cumTotal");
          });
        let expected: number =
          Math.round(
            (val.weight[i] / val.weight.reduce((prev, n) => prev + n)) * 100000
          ) / 1000;
        anal = anal.setIn([...path, "expected"], expected);
        anal = anal.setIn([...path, "actual"], percs);
        anal = anal.setIn([...path, "occurances"], cums);
        anal = anal.setIn([...path, "totalPercs"], totPerc);
      }
    });
  });
  anal = anal.map((val, key) =>
    val.sortBy((x) => x.getIn(["occurances", "All"]))
  );
  fs.writeFileSync(
    "./test/reports/anal_weights.json",
    JSON.stringify(anal.toJS(), null, 3)
  );
  return anal;
}
function calcChances<T>(
  _map: IMap<T, number>,
  map: IMap<T, number> = _map.sort()
): IMap<T, number> {
  return map.map(
    (val, _, iter) =>
      Math.round(
        (val /
          iter
            .valueSeq()
            .toArray()
            .reduce((p, n) => p + n)) *
          100000
      ) / 1000
  );
}
(async () => {
  await getCumStats();
})();
export { analyzer, getStats, getCumStats };
