"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const immutable_1 = require("immutable");
const addItems_1 = require("./addItems");
const updateColors_1 = require("./updateColors");
const dataHelpers_1 = require("./util/dataHelpers");
function addChests(newChests, scores = (0, immutable_1.Map)()) {
    var _a;
    // console.log((<string[]>[]).concat(...newChests));
    function buildChest(chest, id) {
        let totScore = 0;
        const items = chest.map((item) => {
            let temp = (scores.getIn(['itemScores', item]));
            if (!temp)
                throw Error(`Item not found: ${item}`);
            temp = temp;
            totScore += (() => {
                if (!temp.get('score'))
                    throw Error('not found');
                return temp.get('score');
            })();
            return temp;
        });
        return (0, immutable_1.Map)({
            tokenId: id,
            items,
            score: totScore,
            avgScore: totScore / items.length,
        });
    }
    scores = (0, addItems_1.default)([].concat(...newChests), scores);
    scores = (0, updateColors_1.default)(scores);
    const size = ((_a = scores.get('chestScores')) === null || _a === void 0 ? void 0 : _a.size) || 0;
    scores = scores.mergeIn(['chestScores'], (0, immutable_1.Map)(newChests.map((chest, index) => [
        size + 1 + index,
        buildChest(chest, size + 1 + index),
    ])));
    const avgScores = [];
    const totScores = [];
    scores.get('chestScores').forEach((val) => {
        avgScores.push(val.get('avgScore'));
        totScores.push(val.get('score'));
    });
    avgScores.sort((a, b) => b - a);
    totScores.sort((a, b) => b - a);
    return scores.update('chestScores', (0, immutable_1.Map)(), (prev) => prev.map((val) => {
        val = val
            .set('avgRank', avgScores.indexOf(val.get('avgScore')) + 1)
            .set('rank', totScores.indexOf(val.get('score')) + 1);
        val = val.set('color', (0, dataHelpers_1.wavelengthToColor)((1 -
            (val.get('rank') / totScores.length +
                val.get('avgRank') / avgScores.length) /
                2) *
            100));
        return val;
    }));
}
exports.default = addChests;
