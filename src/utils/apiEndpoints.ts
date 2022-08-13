/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
import { IScores } from '@src/components/rarityScores/types';
import axios from 'axios';
import Immutable from 'immutable';

async function getScores(): Promise<IScores> {
    const res = await axios({
        url: 'https://us-east-1.aws.data.mongodb-api.com/app/google-blnmi/endpoint/getScores',
        method: 'get',
    });
    if (res.status !== 200) throw Error(`INTERNAL SERVER ERROR CODE: ${res.status}`);
    return <IScores>fromJSGreedy(res.data[0]);
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
