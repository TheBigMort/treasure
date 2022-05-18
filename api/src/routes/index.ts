/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import * as express from 'express';
import asyncHandler from '../util/asyncHandler';
import { treasure } from '../util/constants';
/* import mongoClient from '../util/mongo';
import { MClient } from '../util/mongo/types'; */
import { scores } from '../util/rarityScores';
import updateMetadata from '../util/updateMetadata';

dotenv.config();

// const mClient: MClient = mongoClient();
const router = express.Router();
const listenProv = new ethers.providers.InfuraProvider(1, process.env.INFURA_KEY);
const eventFilter = {
    address: treasure.address as string,
    topics: [ethers.utils.id('Transfer(address,address,uint256)')],
};
listenProv.on(eventFilter, async (receipt, from = receipt.topics[1]) => {
    await updater(from);
});
(async () => {
    // await scores.initScores(mClient);
    await updateMetadata();
    // mClient.cacheScores(scores.getScores());
    /*     console.log(
        (<IMap<any, any>>scores
            .getScores()
            .get('chestScores')
            ?.minBy((val) => (<IChest>val).get('avgRank'))).toJS()
    ); */
    console.log('init scores done');
})();
router.get('/recal', (req, res, next) => {
    scores.recalibrate()
    res.sendStatus(200);
});
router.get(
    '/getScores',
    asyncHandler(async (req, res, next) => {
        //scores.recalibrate();

        res.json(scores.getScores().toJS());
    })
);
export default router;

async function updater(fromAddy: string) {
    console.log('detected');

    if (fromAddy === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        console.log('updating');
        await updateMetadata();
        // await mClient.cacheScores(scores.getScores());
        console.log('done');
    }
}
