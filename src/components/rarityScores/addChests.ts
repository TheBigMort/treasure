import { Map as IMap } from 'immutable';
import _addItems from './addItems';
import { Chest, IChest, IChestItem, IScores, Scores } from './types';
import _updateColors from './updateColors';

export default function addChests(newChests: string[][], scores: IScores = IMap()): IScores {
    function buildChest(chest: string[], id: number): IChest {
        let totScore: number = 0;
        const items: IChestItem[] = chest.map((item: string): IChestItem => {
            let temp: IChestItem | undefined = <IChestItem | undefined>(
                scores.getIn(['itemScores', item])
            );
            if (!temp) throw Error(`Item not found: ${item}`);
            temp = <IChestItem>temp;
            totScore += ((): number => {
                if (!temp.get('score')) throw Error('not found');
                return <number>temp.get('score');
            })();
            return <IChestItem>temp;
        });

        return <IChest>IMap(<Chest>{
            tokenId: id,
            items,
            score: totScore,
            avgScore: totScore / items.length,
        });
    }
    let newScores = _addItems((<string[]>[]).concat(...newChests), scores);
    newScores = _updateColors(scores);
    const size: number = scores.get('chestScores')?.size || 0;
    newScores = newScores.mergeIn(
        ['chestScores'],
        IMap(
            newChests.map((chest: string[], index): [number, IChest] => [
                size + 1 + index,
                buildChest(chest, size + 1 + index),
            ])
        )
    );
    const avgScores: number[] = [];
    const totScores: number[] = [];

    (<Scores['chestScores']>scores.get('chestScores')).forEach((val: IChest) => {
        avgScores.push(<number>val.get('avgScore'));
        totScores.push(<number>val.get('score'));
    });
    avgScores.sort((a, b) => b - a);
    totScores.sort((a, b) => b - a);
    return newScores.update('chestScores', <Scores['chestScores']>IMap(), (prev) =>
        (<Scores['chestScores']>prev).map((val: IChest) =>
            val
                .set('avgRank', avgScores.indexOf(<number>val.get('avgScore')) + 1)
                .set('rank', totScores.indexOf(<number>val.get('score')) + 1)
        )
    );
}
