"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rarityThresholds = exports.nodeURLs = void 0;
const nodeURLs = [
    'https://main-light.eth.linkpool.io',
    'https://eth-rpc.gateway.pokt.network',
    'https://api.mycryptoapi.com/eth',
    'https://ethereumnodelight.app.runonflux.io',
    'https://rpc.flashbots.net/',
    'https://rpc.ankr.com/eth',
];
exports.nodeURLs = nodeURLs;
const rarityThresholds = {
    legend: 95,
    epic: 85,
    unique: 70,
    uncommon: 40,
    common: 0,
};
exports.rarityThresholds = rarityThresholds;
