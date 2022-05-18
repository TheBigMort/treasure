import { Map as IMap } from 'immutable';
import { IChestItem, IScores, Scores } from './types';
import { wavelengthToColor } from './util/dataHelpers';

export default function updateColors(scores: IScores): IScores {
    let itemRanks: IMap<string, string> = IMap();
    (<Scores['itemScores']>scores.get('itemScores'))
        .groupBy((val: IChestItem) => val.get('mainCat'))
        .map((v) => v.map((x) => x.get('score')))
        .forEach((v) => {
            const s: number[] = (<number[]>v.valueSeq().toArray()).sort((a, b) => a - b);
            v.keySeq()
                .toArray()
                .forEach((item) => {
                    const rank = s.indexOf(<number>scores.getIn(['itemScores', item, 'score'])!);
                    itemRanks = itemRanks.set(item, `${rank}/${s.length}`);
                });
        });
    return scores.update('itemScores', (last) =>
        (<Scores['itemScores']>last).map((v, k) => {
            const itemRank = <string>itemRanks.get(k);
            const percentile =
                (parseFloat(itemRank.split('/')[0]) / parseFloat(itemRank.split('/')[1])) * 100;
            const adjustedRank = `${
                parseFloat(itemRank.split('/')[1]) - parseFloat(itemRank.split('/')[0])
            }/${parseFloat(itemRank.split('/')[1])}`;
            return v
                .set('color', wavelengthToColor(percentile))
                .set('rank', adjustedRank)
                .update(
                    'score',
                    (s) =>
                        (<number>s *
                            (scores.get('itemScores')!.size /
                                parseFloat(itemRank.split('/')[1]))) **
                        (1 / 3)
                );
        })
    );
}
