import { Map as IMap } from "immutable";
import { ModCat } from "../types";
import { calcChances } from "../utils/dataHelpers";
import { IChestItem, IScores, Scores } from "./types";



// type DeepMap<T extends IMap<any,any>> =
export function updateScores(prev: IScores): IScores {
  function calcScoresDeep<T extends IMap<any, any>>(elem: T): T {
    return <T>(
      elem.map((mapping) =>
        typeof mapping.first() === typeof IMap()
          ? calcScoresDeep(<IMap<any, any>>mapping)
          : calcChances(<IMap<any, number>>mapping).map(
              (val) => 1 / (val / 100)
            )
      )
    );
  }
  prev = prev.update("mainModTotals", <Scores["mainModTotals"]>IMap(), (m) =>
    calcScoresDeep<Scores["mainModTotals"]>(<IMap<any, any>>m)
  );

  prev = prev.update("mainItemTotals", <Scores["mainItemTotals"]>IMap(), (m) =>
    calcScoresDeep<Scores["mainItemTotals"]>(<IMap<any, any>>m)
  );
  return prev.update("itemScores", <Scores["itemScores"]>IMap(), (m) =>
    (<Scores["itemScores"]>m).map((val: IChestItem) => {
      let total: number = 1;
      let nones: number = 0;
      let mainScore =
        (<number>(
          prev.getIn([
            "mainItemTotals",
            val.get("mainCat")!,
            val.get("mainItem")!,
          ])
        ));
      total *= <number>(<IMap<ModCat, string>>val.get("brokenDown"))
        .entrySeq()
        .toArray()
        .map(([k, v]): number => {
          if (v === "None") {
            nones += 1;
          }
          return <number>(
            prev.getIn(["mainModTotals", val.get("mainItem"), k, v])
          );
        })
        .reduce((p, n) => p * n);
      return val.set("score", nones > 0 ? total * (mainScore**nones) : total);
    })
  );
}
