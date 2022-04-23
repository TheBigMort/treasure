/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable no-continue */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import Chance from 'chance';
import * as fs from 'fs';
import { fromJS, List, Map as IMap } from 'immutable';
import { csv2json, json2csv } from '../utils/csvUtils';
import { predictOutcome, updateRating } from './ratingAlgo';
import { Matchup } from './ratingAlgo/types';

const prompt = require('prompt-sync')();

const chance = new Chance();
let elos: IMap<string, number> = IMap();
let history: IMap<string, IMap<string, string>> = IMap();

const finishThreshold = 0.3;

function getBestMatchup(items: string[]): Matchup {
    let bestMatchup: Matchup | any;
    for (let i = 0; i < items.length; i += 1) {
        let item = items[i];
        items.slice(i + 1).forEach((elem) => {
            const items = [item, elem].sort();
            [item, elem] = items;
            const eloA = elos.get(item, 500);
            const eloB = elos.get(elem, 500);
            const newPrediction = predictOutcome(eloA, eloB);
            if (
                !bestMatchup ||
                Math.abs(newPrediction.prediction_a - newPrediction.prediction_b) <
                    Math.abs(
                        bestMatchup.prediction.prediction_a - bestMatchup.prediction.prediction_b
                    )
            ) {
                bestMatchup = { itemA: item, itemB: elem, prediction: newPrediction };
            }
        });
    }
    return <Matchup>bestMatchup;
}
async function main(cat: string) {
    let rows: IMap<string, List<string>> = IMap();
    const data = await csv2json(`./metadata/in/${cat}.csv`);
    Object.entries(data.toJS()).forEach(([key, val]) => {
        elos = IMap();
        const mainArr = <string[]>val;
        let bestMatchup: Matchup = getBestMatchup(mainArr);
        do {
            bestMatchup = getBestMatchup(mainArr);
            const last: string | undefined = <string | undefined>(
                history.getIn([bestMatchup.itemA, bestMatchup.itemB], undefined)
            );
            if (last) {
                elos = elos.set(
                    bestMatchup.itemA,
                    updateRating(
                        bestMatchup.prediction.rating_a,
                        bestMatchup.itemA === last ? 1 : 0,
                        bestMatchup.prediction.prediction_a
                    ).newRating
                );
                elos = elos.set(
                    bestMatchup.itemB,
                    updateRating(
                        bestMatchup.prediction.rating_b,
                        bestMatchup.itemB === last ? 1 : 0,
                        bestMatchup.prediction.prediction_b
                    ).newRating
                );
                continue;
            }
            console.log('Select the one most rare:');
            console.log(`1) ${bestMatchup.itemA}`);
            console.log(`2) ${bestMatchup.itemB}`);
            console.log(`3) Tie`);
            console.log(`4) See Results`);

            let response: number = parseInt(prompt(), 10);
            if (response !== 1 && response !== 2 && response !== 3 && response !== 4) {
                console.log(`Incorrect Response: ${response}. Try again`);
                continue;
            }
            if (response === 4) break;
            if (response === 3) {
                response = chance.integer({ min: 1, max: 2 });
            }
            elos = elos.set(
                bestMatchup.itemA,
                updateRating(
                    bestMatchup.prediction.rating_a,
                    response === 1 ? 1 : 0,
                    bestMatchup.prediction.prediction_a
                ).newRating
            );
            elos = elos.set(
                bestMatchup.itemB,
                updateRating(
                    bestMatchup.prediction.rating_b,
                    response === 2 ? 1 : 0,
                    bestMatchup.prediction.prediction_b
                ).newRating
            );
            let nested: IMap<string, string> = history.get(bestMatchup.itemA, IMap());
            nested = nested.set(
                bestMatchup.itemB,
                response === 1 ? bestMatchup.itemA : bestMatchup.itemB
            );

            history = history.set(bestMatchup.itemA, nested);
        } while (
            Math.abs(bestMatchup.prediction.prediction_a - bestMatchup.prediction.prediction_b) <
            finishThreshold
        );

        rows = rows.set(`items_${key}`, List(elos.keySeq()));
        rows = rows.set(`scores_${key}`, List(elos.valueSeq().map((elem) => elem.toString())));
    });

    await json2csv(rows, `rarities/${cat}`);
}

fs.readFile('./metadata/scripts/cache.json', (err, data) => {
    if (err) throw err;
    history = <IMap<string, IMap<string, string>>>fromJS(JSON.parse(data.toString())).toMap();
    main('head').then(() => {
        fs.writeFile(
            './metadata/scripts/cache.json',
            JSON.stringify(history.toJS(), null, 3),
            (err) => {
                if (err) throw err;
            }
        );
        console.log('finished');
    });
});
