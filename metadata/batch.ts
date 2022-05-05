import { wtMaxValue } from "./utils/constants";
import { newtonsMethod } from "./utils/newton";

export default function formatWeights(data: number[]): number[] {
  function f(x: number) {
    return (
      data.map((val: number) => val * x).reduce((p, n) => p + n) -
      Math.floor(wtMaxValue*.99)
    );
  }
  const mult: number = newtonsMethod(f);
  let total: number = 0;
  let newData: number[] = [];
  for (let i = 0; i < data.length; i++) {
    total += Math.round(data[i] * mult);
    newData.push(total);
  }
  return newData;
}
    /*     uint32[] private _numItemWts = [
        925210,
        2410241,
        5274519,
        9472522,
        13177989,
        15000000,
        13177989,
        9472522,
        5274519,
        2410241,
        925210
    ];
    uint32[] private _numModWts = [0.6153846154,25,175,549.3846154,250];
    uint32[] private _itemCatWts = [319995, 405405,1119690,760500,1790100,299520,74880]; */