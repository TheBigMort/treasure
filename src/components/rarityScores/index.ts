import _addChests from './addChests';
import _addItems from './addItems';
import { IScores } from './types';
import _updateColors from './updateColors';

export default function rarityScores() {
    let scores: IScores;

    return {
        getScores: (): IScores => scores,
        addItems: (items: string[]): void => {
            scores = _addItems(items, scores);
            scores = _updateColors(scores);
        },
        addChests: (chests: string[][]): void => {
            scores = _addChests(chests, scores);
        },
    };
}
