import { Map as IMap } from "immutable";
import { modCats } from '../types';
import { breakdown } from "./breakdown";
import { IScores, Scores } from "./types";
import { updateScores } from "./updateScores";
function addItems(
  items: string[],
  scores: IScores = IMap(),
  brokeItems: Scores["itemScores"] = breakdown(items)
): IScores {
  brokeItems.forEach((item) => {
    scores = scores.setIn(["itemScores", item.get('item')], item);
    scores = scores.updateIn(
      ["mainItemTotals", item.get("mainCat"), item.get("mainItem")],
      0,
      (x) => <number>x + 1
    );
    modCats.forEach((cat) => {
      scores = scores.updateIn(
        [
          "mainModTotals",
          item.get("mainItem"),
          cat,
          <string>item.getIn(["brokenDown", cat]),
        ],
        0,
        (x) => <number>x + 1
      );
    });
  });
  return updateScores(scores);
}
export { addItems };
