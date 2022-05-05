import * as fs from "fs";
import { List, Map as IMap } from "immutable";
import { IChestItem2, MainCat, mainCats, ModCat, Payload, Scores } from "../types";
const prepCache: Payload = <Payload>(
  JSON.parse(fs.readFileSync("./test/prep_cache.json").toString())
);
function breakdown(items: string[]): Scores['itemScores'] {
  const itemBreakdown = (itemStr: string): IChestItem2 => {
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
    let mainItem: string | undefined;
    let mainCat: MainCat | undefined;

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
            mainCat = <MainCat>found[0];
          }
          return [found[0], part.trim()];
        })
    ).filterNot((val) => val === mainItem);
    if (!mainItem || !mainCat) throw Error(`couldnt find main item`);
    return <IChestItem2>IMap({
      item: itemStr,
      mainCat: mainCat,
      mainItem: mainItem,
      brokenDown: IMap({
        POSSESSIVE: broken.get("POSSESSIVE", "None"),
        EXTRA: broken.get("EXTRA", "None"),
        MATERIAL: broken.get("MATERIAL", "None"),
        TAIL: broken.get("TAIL", "None")
      }),
    });
  };
  return IMap(items.map((item): [string, IChestItem2] => [item,itemBreakdown(item)]));
}
export { breakdown };
