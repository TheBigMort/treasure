"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
const dotenv = __importStar(require("dotenv"));
const ethers_1 = require("ethers");
const express = __importStar(require("express"));
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const constants_1 = require("../util/constants");
/* import mongoClient from '../util/mongo';
import { MClient } from '../util/mongo/types'; */
const rarityScores_1 = require("../util/rarityScores");
const updateMetadata_1 = __importDefault(require("../util/updateMetadata"));
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
