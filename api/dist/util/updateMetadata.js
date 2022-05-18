"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const ethers_1 = require("ethers");
const constants_1 = require("./constants");
const rarityScores_1 = require("./rarityScores");
async function updateMetadata() {
    var _a, _b;
    const parseChest = async (id) => {
        const uri = (await bluebird_1.Promise.any(constants_1.nodes.map((node) => new ethers_1.ethers.Contract(constants_1.treasure.address, constants_1.treasure.abi, node).tokenURI(id)))).slice(29);
        const metadata = JSON.parse(Buffer.from(uri, 'base64').toString('utf-8'));
        const attributes = metadata.attributes.map((attr) => attr.value);
        return attributes;
    };
    const total = (await bluebird_1.Promise.any(constants_1.nodes.map((node) => new ethers_1.ethers.Contract(constants_1.treasure.address, constants_1.treasure.abi, node).totalSupply()))).toNumber();
    const pending = [];
    for (let i = ((_b = (_a = rarityScores_1.scores.getScores().get('chestScores')) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0) + 1; i <= total; i += 1) {
        pending.push(parseChest(i));
    }
    const final = await bluebird_1.Promise.all(pending);
    rarityScores_1.scores.addChests(final);
}
exports.default = updateMetadata;
