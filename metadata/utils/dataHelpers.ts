import { Map as IMap } from 'immutable';

export function calcChances<T>(
    _map: IMap<T, number>,
    map: IMap<T, number> = _map.sort()
  ): IMap<T, number> {
    let total = map
      .valueSeq()
      .toArray()
      .reduce((p, n) => p + n);
    return map.map((val) => Math.round((val / total) * 100000) / 1000);
  }