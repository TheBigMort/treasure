import { Map as IMap } from 'immutable';
import { IScores } from "../types";
import { addItems as _addItems } from "./addItems";
import { updateColors as _updateColors } from './updateColors';
/* const scoreMult: number = 100;
const mainItemBonusMult: number = 1;
const scoreSquare: number = 2;
const maxScore: number = 10000; */

export default function rarityScores() {
  let scores: IScores;
  let colorCodes: IMap<string, string>;
  return {
    getScores(): IScores {
      return scores;
    },
    addItems(items: string[]): void {
      scores = _addItems(items, scores);
      scores = _updateColors(scores);
    },
  };
}

/* export default function assignRarity(
  chests: Chest[]
): IMap<MainCat, IMap<string, number>> {
  let mainTotals: IMap<MainCat, IMap<string, number>> = IMap();
  let numModsTotals: IMap<number, number> = IMap();
  let totals: IMap<MainCat, IMap<string, IMap<string, number>>> = IMap();
  let scores: IMap<MainCat, IMap<string, number>> = IMap();

  List([])
    .concat(...chests)
    .forEach((val: ChestItem) => {
      numModsTotals = numModsTotals.update(
        Object.keys(val.brokenDown).length - 1,
        0,
        (value) => value + 1
      );
      const mainCat: MainCat = getMainCat(val);
      const mainItem: string = val.brokenDown[<MainCat & ModCat>mainCat];
      mainTotals = mainTotals.updateIn(
        [mainCat, mainItem],
        0,
        (value) => <number>value + 1
      );
      if (Object.keys(val.brokenDown).length < 2) {
        console.log(val.item);
      }
      Object.entries(val.brokenDown).forEach(([k, v]) => {
        if (k !== mainCat) {
          totals = totals.updateIn(
            [mainCat, mainItem, v],
            0,
            (value) => <number>value + 1
          );
        }
      });
    });
  totals = totals.map((val) => val.map((v) => calcScores(v).sort()));
  mainTotals = mainTotals.map((val) => calcScores(val));
  numModsTotals = calcScores<number>(numModsTotals);
  console.log(numModsTotals.toJS());
  List([])
    .concat(...chests)
    .forEach((val: ChestItem) => {
      let totalScore: number = numModsTotals.get(
        Object.keys(val.brokenDown).length - 1
      )!;
      const mainCat: MainCat = getMainCat(val);
      const mainItem: string = val.brokenDown[<MainCat & ModCat>mainCat];
      Object.entries(val.brokenDown).forEach(([k, v]) => {
        if (k === mainCat) {
          totalScore +=
            <number>mainTotals.getIn([mainCat, mainItem]) * mainItemBonusMult;
        } else {
          totalScore += <number>totals.getIn([mainCat, mainItem, v]);
        }
      });
      scores = scores.setIn(
        [mainCat, val.item],
        Math.log(Math.round(totalScore * 10) / 10)
      );
    });
  scores = scores.update("HEAD", IMap(), (value) => value.sort());
  console.log(scores.get("HEAD")?.toJS());
  return scores.map((val) =>
    val
      .map((v, _, iter) => (v - iter.min()!) / (iter.max()! - iter.min()!))
  );
  function normalize(mapping: IMap<any, number>): IMap<any, number> {
    return mapping.map((elem, _, iter) =>
      Math.round(elem / (iter.max()! / maxScore))
    );
  }
  function calcScores<T>(totes: IMap<T, number>): IMap<T, number> {
    return calcChances(totes).map((val) => 1 / (val / 100));
  }
  function getMainCat(item: ChestItem): MainCat {
    const cats: string[] = Object.keys(item.brokenDown);
    for (let i = 0; i < cats.length; i++) {
      if ((<string[]>Array.from(mainCats)).includes(cats[i])) {
        return <MainCat>cats[i];
      }
    }
    throw Error(`main item not found: ${item.item}`);
  }
  function adjScores(rawScores: IMap<string, number>): IMap<string, number> {
    const average: number =
      <number>rawScores.reduce((p, n) => p + n) / rawScores.size;
    const deviation = dev(rawScores.valueSeq().toArray());

    return rawScores.map((val) => Math.abs(val - average) / deviation);

    function dev(array: number[]) {
      const n = array.length;
      const mean = array.reduce((a, b) => a + b) / n;
      return Math.sqrt(
        array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
      );
    }
    function normalize() {
      return rawScores.map((val, _, iter) =>
        Math.pow(
          ((val - iter.min()!) / (iter.max()! - iter.min()!)) *
            Math.pow(maxScore, 1 / scoreSquare),
          scoreSquare
        )
      );
    }
  }
}
function wavelengthToColor(wl: number) {
  let R,
    G,
    B,
    alpha,
    colorSpace;

  if (wl) {
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
  }

  // intensty is lower at the edges of the visible spectrum.
  if (wl > 780 || wl < 380) {
    alpha = 0;
  } else if (wl > 700) {
    alpha = (780 - wl) / (780 - 700);
  } else if (wl < 420) {
    alpha = (wl - 380) / (420 - 380);
  } else {
    alpha = 1;
  }

  colorSpace = [
    "rgba(" + R * 255 + "," + G * 255 + "," + B * 255 + ", " + alpha + ")",
    R,
    G,
    B,
    alpha,
  ];

  // colorSpace is an array with 5 elements.
  // The first element is the complete code as a string.
  // Use colorSpace[0] as is to display the desired color.
  // use the last four elements alone or together to access each of the individual r, g, b and a channels.

  return colorSpace;
}
function calcChances<T>(
  _map: IMap<T, number>,
  map: IMap<T, number> = _map.sort()
): IMap<T, number> {
  let total = map
    .valueSeq()
    .toArray()
    .reduce((p, n) => p + n);
  return map.map((val) => Math.round((val / total) * 100000) / 1000);
}
 */
