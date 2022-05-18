"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const dataHelpers_1 = require("./util/dataHelpers");
function updateColors(scores) {
    let itemRanks = (0, immutable_1.Map)();
    scores.get('itemScores')
        .groupBy((val) => val.get('mainCat'))
        .map((v) => v.map((x) => x.get('score')))
        .forEach((v) => {
        const s = v.valueSeq().toArray().sort((a, b) => a - b);
        v.keySeq()
            .toArray()
            .forEach((item) => {
            const rank = s.indexOf(scores.getIn(['itemScores', item, 'score']));
            itemRanks = itemRanks.set(item, `${rank}/${s.length}`);
        });
    });
    return scores.update('itemScores', (last) => last.map((v, k) => {
        const itemRank = itemRanks.get(k);
        const percentile = (parseFloat(itemRank.split('/')[0]) / parseFloat(itemRank.split('/')[1])) * 100;
        const adjustedRank = `${parseFloat(itemRank.split('/')[1]) - parseFloat(itemRank.split('/')[0])}/${parseFloat(itemRank.split('/')[1])}`;
        return v
            .set('color', (0, dataHelpers_1.wavelengthToColor)(percentile))
            .set('rank', adjustedRank)
            .update('score', (s) => (s *
            (scores.get('itemScores').size /
                parseFloat(itemRank.split('/')[1]))) **
            (1 / 3));
    }));
}
exports.default = updateColors;
