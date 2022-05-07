import { addChests as _addChests } from './addChests';
import { addItems as _addItems } from "./addItems";
import { IScores } from "./types";
import { updateColors as _updateColors } from './updateColors';
export default function rarityScores() {
  let scores: IScores;

  return {
    getScores: (): IScores => {
      return scores;
    },
    addItems: (items: string[]): void => {
      scores = _addItems(items, scores);
      scores = _updateColors(scores);
    },
    addChests: (chests: string[][]): void => {
      scores = _addChests(chests, scores);
    }
  };
}