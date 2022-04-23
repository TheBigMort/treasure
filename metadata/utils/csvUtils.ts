import csvToJson from 'csvtojson';
import * as fs from 'fs';
import { List, Map as IMap } from 'immutable';
import Category from 'metadata/genChests/category';
import { Cat } from 'metadata/genChests/types';
import { modClasses } from './constants';

const ObjectsToCsv = require('objects-to-csv');

async function json2csv(data: IMap<string, List<string>>, filename: string) {
    const keys: string[] = data.keySeq().toArray();
    const makeEntry = (index: number) => {
        let temp = IMap();
        keys.forEach((k) => {
            temp = temp.set(k, data.getIn([k, index], ''));
        });
        return temp.toJS();
    };
    const temp = [];
    for (let i = 0; i < data.maxBy((val) => val.count())!.count(); i += 1) {
        temp.push(makeEntry(i));
    }
    const csv = new ObjectsToCsv(temp);
    await csv.toDisk(`./metadata/in/${filename}.csv`);
}

async function csv2json(csvPath: string): Promise<IMap<string, List<string>>> {
    let catItems: IMap<string, List<string>> = IMap();

    (await csvToJson().fromFile(csvPath)).forEach((elem) => {
        Object.entries(elem).forEach(([key, val]) => {
            const item: string = <string>val;
            if (item.length > 0) {
                catItems = catItems.set(
                    key,
                    (<List<string>>catItems.get(key, List([]))).push(item)
                );
            }
        });
    });
    return catItems;
}

async function initializeClasses(): Promise<Cat, Category> {
    const allItems = IMap(
        await Promise.all(
            fs
                .readdirSync('./metadata/in/rarities')
                .filter((file) => file.endsWith('.csv'))
                .map(async (file): Promise<[string, IMap<string, IMap<string, number>>]> => {
                    const data = await csv2json(`./metadata/in/rarities/${file}`);
                    return [
                        file.split('.')[0],
                        IMap(
                            modClasses.map((val: string): [string, IMap<string, number>] => {
                                const scores: number[] = data
                                    .get(`scores_${val}`, List([]))
                                    .map((score: any) => parseInt(<string>score, 10))
                                    .toArray();
                                const items: string[] = data
                                    .get(`items_${val}`, List([]))
                                    .toArray();
                                if (scores.length !== items.length) throw Error('length mismatch');
                                return [
                                    val,
                                    IMap(
                                        items.map((item, index): [string, number] => [
                                            item,
                                            scores[index] / (items.length * 500),
                                        ])
                                    ),
                                ];
                            })
                        ),
                    ];
                })
        )
    );
    allItems.map(())
}
export { json2csv, csv2json, initializeClasses };
