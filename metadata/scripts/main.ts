import csvToJson from 'csvtojson';
import { List, Map as IMap } from 'immutable';
import * as natural from 'natural';

const ObjectsToCsv = require('objects-to-csv');

const language = 'EN';
const defaultCategory = 'N';

const lexicon = new natural.Lexicon(language, defaultCategory);
const ruleSet = new natural.RuleSet('EN');
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

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
    await csv.toDisk(`./metadata/out/${filename}.csv`);
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
function groupItems(items: List<string>): IMap<string, List<string>> {
    let types: IMap<string, List<string>> = IMap();
    const tagged = tagger.tag(items.toArray()).taggedWords;

    tagged.forEach((elem: { token: string; tag: string }) => {
        types = types.set(elem.tag, (<List<string>>types.get(elem.tag, List([]))).push(elem.token));
    });
    return types;
}
(async () => {
    const data: IMap<string, List<string>> = (await csv2json('./metadata/in/modifiers.csv')).map(
        (val) => val.map((item) => item.trim().toLowerCase().replace(/\s/g, '-').replace("'", ''))
    );
    await Promise.all(data.entrySeq().map(([k, v]) => json2csv(groupItems(v), k)));
    // const csv = new ObjectsToCsv(catItems.toJS());
    // await csv.toDisk('./testing.csv');

    // Return the CSV file as string:
    // console.log(await csv.toString());
    /*     const data = [`golden`, `knight's shining`, `elephant tusks`, `corrupt`, `basic bronze`].map(
        (phrase) => phrase.trim().toLowerCase().replace(/\s/g, '-').replace("'", '')
    ); */
    /* 
    

    
    console.log(types.toJS()); */
    // console.log(data.toJS());
})();
