/* eslint-disable no-param-reassign */
import { Map as IMap } from 'immutable';
import { IChestItem, IScores, ModCat, Scores } from './types';
import { calcChances } from './util/dataHelpers';
// type DeepMap<T extends IMap<any,any>> =
export default function updateScores(prev: IScores): IScores {
    function calcScoresDeep<T extends IMap<any, any>>(elem: T): T {
        return <T>(
            elem.map((mapping) =>
                typeof mapping.first() === typeof IMap()
                    ? calcScoresDeep(<IMap<any, any>>mapping)
                    : calcChances(<IMap<any, number>>mapping).map((val) => 1 / (val / 100))
            )
        );
    }
    /*     fs.writeFileSync(
        './itemTotals.json',
        JSON.stringify(prev.get('mainItemTotals')?.toJS(), null, 3)
    ); */
    prev = prev.update('mainModTotals', <Scores['mainModTotals']>IMap(), (m) =>
        calcScoresDeep<Scores['mainModTotals']>(<IMap<any, any>>m)
    );
    prev = prev.update('mainItemTotals', <Scores['mainItemTotals']>IMap(), (m) =>
        calcScoresDeep<Scores['mainItemTotals']>(<IMap<any, any>>m)
    );
    prev = prev.update('numModTotals', <Scores['numModTotals']>IMap(), (m) =>
        calcChances<number>(<Scores['numModTotals']>m).map((val) => 1 / (val / 100))
    );
    // console.log(prev.get('mainItemTotals')?.toJS());
    prev = prev.update('itemScores', <Scores['itemScores']>IMap(), (m) =>
        (<Scores['itemScores']>m).map((val: IChestItem) => {
            let total: number = 1;
            let numMods: number = 0;
            const mainScore = <number>(
                prev.getIn(['mainItemTotals', val.get('mainCat')!, val.get('mainItem')!])
            );
            total *= <number>(<IMap<ModCat, string>>val.get('brokenDown'))
                .entrySeq()
                .toArray()
                .map(([k, v]): number => {
                    if (v !== 'None') {
                        numMods += 1;
                    }
                    return <number>prev.getIn(['mainModTotals', val.get('mainItem'), k, v]);
                })
                .reduce((p, n) => p * (n + mainScore));
            const numModsBoost: number = <number>prev.getIn(['numModTotals', numMods]);
            return val.set('score', total * numModsBoost);
        })
    );
    return prev;
}
