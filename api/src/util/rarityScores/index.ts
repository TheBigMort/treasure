/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-mutable-exports */
import { Map as IMap } from 'immutable';
// import { MClient } from '../mongo/types';
import _addChests from './addChests';
import { IScores } from './types';
import _updateColors from './updateColors';
import _updateScores from './updateScores';

export const scores = rarityScores();

function rarityScores() {
    let s: IScores = IMap();
    return {
        /*         initScores: async (mclient: MClient): Promise<void> => {
            s = (await mclient.getCachedScores()) ?? IMap();
        }, */
        addChests: (chests: string[][]): void => {
            s = _addChests(chests, s);
        },
        getScores: (): IScores => s,
        recalibrate: (): void => {
            s = _addChests([], s);
            s = _updateScores(s);
            s = _updateColors(s);
        },
    };
}
