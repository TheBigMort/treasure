import { Map as IMap } from "immutable";
import { IChestItem, IScores, Scores } from "./types";



const pr = {
  legend: 98,
  epic: 90,
  unique: 72.5,
  uncommon: 45,
  common: 0,
};
function updateColors(scores: IScores): IScores {
  let itemRanks: IMap<string, string> = IMap();
  (<Scores["itemScores"]>scores.get("itemScores"))
    .groupBy((val: IChestItem) => val.get("mainCat"))
    .map((v) => v.map((x) => x.get("score")))
    .forEach((v, k) => {
      let s: number[] = (<number[]>v.valueSeq().toArray()).sort(
        (a, b) => a - b
      );
      v.keySeq()
        .toArray()
        .forEach((item) => {
          let rank = s.indexOf(
            <number>scores.getIn(["itemScores", item, "score"])!
          );
          itemRanks = itemRanks.set(item, `${rank}/${s.length}`);
        });
    });
  return scores.update("itemScores", (last) =>
    (<Scores["itemScores"]>last).map((v, k) => {
      let itemRank = <string>itemRanks.get(k);
      let percentile =
        (parseFloat(itemRank.split("/")[0]) /
          parseFloat(itemRank.split("/")[1])) *
        100;
      let adjustedRank = `${
        parseFloat(itemRank.split("/")[1]) - parseFloat(itemRank.split("/")[0])
      }/${parseFloat(itemRank.split("/")[1])}`;
      v = v.set("color", wavelengthToColor(percentile));
      v = v.set("rank", adjustedRank);
      v = v.update("score", (s) =>
        Math.pow(
          <number>s *
            (scores.get("itemScores")!.size /
              parseFloat(itemRank.split("/")[1])),
          1 / 3
        )
      );
      return v;
    })
  );
}
export { updateColors };

function wavelengthToColor(p: number): string {
  let R, G, B, alpha, colorSpace;

  if (p < pr.uncommon) {
    R = 1;
    G = 1;
    B = 1;
  } else if (p >= pr.uncommon && p < pr.unique) {
    R = (-1 * (p - pr.unique)) / (pr.unique - pr.uncommon);
    G = 1;
    B = (-1 * (p - pr.unique)) / (pr.unique - pr.uncommon);
  } else if (p >= pr.unique && p < pr.epic) {
    R = 0;
    G = 1;
    B = (p - pr.unique) / (pr.epic - pr.unique);
  } else if (p >= pr.epic && p < pr.legend) {
    R = (p - pr.epic) / (pr.legend - pr.epic);
    G = (-1 * (p - pr.legend)) / (pr.legend - pr.epic);
    B = 1;
  } else if (p >= pr.legend && p < 100) {
    R = 1;
    G = 0;
    B = (-1 * (p - 100)) / (100 - pr.legend);
  } else {
    R = 0;
    G = 0;
    B = 0;
  }
  /*   if (wl) {
    R = (-1 * (wl - 440)) / (440 - 380);
    G = 0;
    B = 1;
  } else if (wl >= 440 && wl < 490) {
    R = 0;
    G = (wl - 440) / (490 - 440);
    B = 1;
  } else if (wl >= 490 && wl < 510) {
    R = 0;
    G = 1;
    B = (-1 * (wl - 510)) / (510 - 490);
  } else if (wl >= 510 && wl < 580) {
    R = (wl - 510) / (580 - 510);
    G = 1;
    B = 0;
  } else if (wl >= 580 && wl < 645) {
    R = 1;
    G = (-1 * (wl - 645)) / (645 - 580);
    B = 0.0;
  } else if (wl >= 645 && wl <= 780) {
    R = 1;
    G = 0;
    B = 0;
  } else {
    R = 0;
    G = 0;
    B = 0;
  } */
  R = Math.round(R * 255);
  G = Math.round(G * 255);
  B = Math.round(B * 255);

  /*   colorSpace = [
    "rgba(" + R * 255 + "," + G * 255 + "," + B * 255 + ",1)",
    R,
    G,
    B,
    alpha,
  ]; */

  return "rgba(" + R + "," + G + "," + B + ",1)";
}
