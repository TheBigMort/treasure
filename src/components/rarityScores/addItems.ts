/* eslint-disable no-param-reassign */
import { Map as IMap } from 'immutable';
import breakdown from './breakdown';
import { IScores, ModCat, modCats, Scores } from './types';
import updateScores from './updateScores';

export default function addItems(
    items: string[],
    scores: IScores = IMap(),
    brokeItems: Scores['itemScores'] = breakdown([
        ...items,
        ...(<string[]>scores.get('itemScores', IMap()).keySeq().toArray()),
    ])
): IScores {
    let newScores: IScores = scores;
    brokeItems.forEach((item) => {
        newScores = newScores
            .setIn(['itemScores', item.get('item')], item)
            .updateIn(
                ['mainItemTotals', item.get('mainCat'), item.get('mainItem')],
                0,
                (x) => <number>x + 1
            );
        let numMods: number = 0;
        modCats.forEach((cat: ModCat) => {
            if (<string>item.getIn(['brokenDown', cat]) !== 'None') {
                numMods += 1;
            }
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
        newScores = newScores.updateIn(['numModTotals', numMods], 0, (x) => <number>x + 1);
    });
    return updateScores(newScores);
}
