import { Map as IMap } from 'immutable';
import { ModCat } from 'metadata/types';
import breakdown from './breakdown';
import { IScores, modCats, Scores } from './types';
import updateScores from './updateScores';

export default function addItems(
    items: string[],
    scores: IScores = IMap(),
    brokeItems: Scores['itemScores'] = breakdown(items)
): IScores {
    brokeItems.forEach((item) => {
        let newScores = scores
            .setIn(['itemScores', item.get('item')], item)
            .updateIn(
                ['mainItemTotals', item.get('mainCat'), item.get('mainItem')],
                0,
                (x) => <number>x + 1
            );
        modCats.forEach((cat: ModCat) => {
            newScores = newScores.updateIn(
                [
                    'mainModTotals',
                    item.get('mainItem'),
                    cat,
                    <string>item.getIn(['brokenDown', cat]),
                ],
                0,
                (x) => <number>x + 1
            );
        });
    });
    return updateScores(scores);
}
