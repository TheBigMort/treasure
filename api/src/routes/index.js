"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
const dotenv = require("dotenv");
const ethers_1 = require("ethers");
const express = require("express");
const asyncHandler_1 = require("../util/asyncHandler");
const constants_1 = require("../util/constants");
/* import mongoClient from '../util/mongo';
import { MClient } from '../util/mongo/types'; */
const rarityScores_1 = require("../util/rarityScores");
const updateMetadata_1 = require("../util/updateMetadata");
dotenv.config();
// const mClient: MClient = mongoClient();
const router = express.Router();
const listenProv = new ethers_1.ethers.providers.InfuraProvider(1, process.env.INFURA_KEY);
const eventFilter = {
    address: constants_1.treasure.address,
    topics: [ethers_1.ethers.utils.id('Transfer(address,address,uint256)')],
};
listenProv.on(eventFilter, async (receipt, from = receipt.topics[1]) => {
    await updater(from);
});
(async () => {
    // await scores.initScores(mClient);
    await (0, updateMetadata_1.default)();
    // mClient.cacheScores(scores.getScores());
    /*     console.log(
        (<IMap<any, any>>scores
            .getScores()
            .get('chestScores')
            ?.minBy((val) => (<IChest>val).get('avgRank'))).toJS()
    ); */
    console.log('init scores done');
})();
/* router.get(
    '/updateScores',
    asyncHandler(async (req, res, next) => {
        // const start = Date.now();
        try {
            await updateMetadata();

            res.sendStatus(200);
        } catch (e) {
            console.error(e);
        }
                const end = Date.now();
        console.log(Math.round((end - start) * 100) / 100);
    })
); */
router.get('/recal', (req, res, next) => {
    (0, updateMetadata_1.default)();
    // mClient.cacheScores(scores.getScores());
    res.sendStatus(200);
});
router.get('/getScores', (0, asyncHandler_1.default)(async (req, res, next) => {
    rarityScores_1.scores.recalibrate();
    res.json(rarityScores_1.scores.getScores().toJS());
}));
exports.default = router;
async function updater(fromAddy) {
    console.log('detected');
    if (fromAddy === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        console.log('updating');
        await (0, updateMetadata_1.default)();
        // await mClient.cacheScores(scores.getScores());
        console.log('done');
    }
}
