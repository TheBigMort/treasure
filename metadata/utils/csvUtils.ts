import csvToJson from 'csvtojson';
import { List, Map as IMap } from 'immutable';

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

export { json2csv, csv2json };
