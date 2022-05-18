/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
import Immutable from 'api/node_modules/immutable/dist/immutable';
import { IScores } from 'api/src/util/rarityScores/types';
import axios from 'axios';

export default async function getScores(): Promise<IScores> {
    const res = await axios({
        url: 'https://treasure-rarity.herokuapp.com/getScores',
        method: 'get',
    });
    if (res.status !== 200) throw Error(`INTERNAL SERVER ERROR CODE: ${res.status}`);
    return <IScores>fromJSGreedy(res.data);
}
function fromJSGreedy(js: any): any {
    return typeof js !== 'object' || js === null
        ? js
        : Array.isArray(js)
        ? Immutable.Seq(js).map(fromJSGreedy).toList()
        : Immutable.Seq(js).map(fromJSGreedy).toMap();
}
