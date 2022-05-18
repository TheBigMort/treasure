"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const immutable_1 = require("immutable");
const breakdown_1 = __importDefault(require("./breakdown"));
const types_1 = require("./types");
const updateScores_1 = __importDefault(require("./updateScores"));
function addItems(items, scores = (0, immutable_1.Map)(), brokeItems = (0, breakdown_1.default)([
    ...items,
    ...scores.get('itemScores', (0, immutable_1.Map)()).keySeq().toArray(),
])) {
    let newScores = scores;
    brokeItems.forEach((item) => {
        newScores = newScores
            .setIn(['itemScores', item.get('item')], item)
            .updateIn(['mainItemTotals', item.get('mainCat'), item.get('mainItem')], 0, (x) => x + 1);
        let numMods = 0;
        types_1.modCats.forEach((cat) => {
            if (item.getIn(['brokenDown', cat]) !== 'None') {
                numMods += 1;
            }
            newScores = newScores.updateIn([
                'mainModTotals',
                item.get('mainItem'),
                cat,
                item.getIn(['brokenDown', cat]),
            ], 0, (x) => x + 1);
        });
        newScores = newScores.updateIn(['numModTotals', numMods], 0, (x) => x + 1);
    });
    return (0, updateScores_1.default)(newScores);
}
exports.default = addItems;
