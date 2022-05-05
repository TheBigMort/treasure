import { Map as IMap } from "immutable";
import { newtonsMethod } from "./newton";

export function adjWeights<T>(
  _data: IMap<T, number>,
  rarestWt: number,
  scaleTo: number,
  data = _data.map((elem,_,iter) => elem/iter.max()!).sort()
): IMap<T, number> {
  if (data.size < 2) throw Error("Invalid map size");
  if (rarestWt >= 1 / data.size) throw Error("Invalid");
  const adjust = () => {
    return data
      .map((elem) => Math.pow(elem, exp))
      .map((elem, _, iter) =>
        cutShort
          ? elem / Math.pow(10, Math.floor(Math.log10(iter.max()!)))
          : Math.round(elem / (iter.max()! / scaleTo))
      );
  };
  let cutShort: boolean = false;
  let exp: number = newtonsMethod((x: number) => {
    const res =
      Math.pow(data.first(), x) /
        data
          .valueSeq()
          .toArray()
          .map((elem) => Math.pow(elem, x))
          .reduce((p, n) => p + n) -
      rarestWt;
    if (Number.isNaN(res)) {
      cutShort = true;
    }
    return res;
  });
  return cutShort ? adjWeights(adjust(), rarestWt, scaleTo) : adjust();
}
