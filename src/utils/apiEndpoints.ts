/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
import { IScores } from '@components/rarityScores/types';
import axios from 'axios';
import Immutable from 'immutable';

async function getScores(): Promise<IScores> {
    const res = await axios({
        url: 'https://treasure-rarity.herokuapp.com/getScores',
        method: 'get',
    });
    if (res.status !== 200) throw Error(`INTERNAL SERVER ERROR CODE: ${res.status}`);
    return <IScores>fromJSGreedy(res.data);
}
async function recal(): Promise<void> {
    const res = await axios({
        url: 'https://treasure-rarity.herokuapp.com/recal',
        method: 'get',
    });
    if (res.status !== 200) throw Error(`ERROR REFRESHING METADATA. CODE: ${res.status}`);
}
function fromJSGreedy(js: any): any {
    return typeof js !== 'object' || js === null
        ? js
        : Array.isArray(js)
        ? Immutable.Seq(js).map(fromJSGreedy).toList()
        : Immutable.Seq(js).map(fromJSGreedy).toMap();
}

export { getScores, recal };
