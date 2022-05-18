"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const immutable_1 = require("immutable");
const dataHelpers_1 = require("./util/dataHelpers");
// type DeepMap<T extends IMap<any,any>> =
function updateScores(prev) {
    function calcScoresDeep(elem) {
        return (elem.map((mapping) => typeof mapping.first() === typeof (0, immutable_1.Map)()
            ? calcScoresDeep(mapping)
            : (0, dataHelpers_1.calcChances)(mapping).map((val) => 1 / (val / 100))));
    }
    /*     fs.writeFileSync(
        './itemTotals.json',
        JSON.stringify(prev.get('mainItemTotals')?.toJS(), null, 3)
    ); */
    prev = prev.update('mainModTotals', (0, immutable_1.Map)(), (m) => calcScoresDeep(m));
    prev = prev.update('mainItemTotals', (0, immutable_1.Map)(), (m) => calcScoresDeep(m));
    prev = prev.update('numModTotals', (0, immutable_1.Map)(), (m) => (0, dataHelpers_1.calcChances)(m).map((val) => 1 / (val / 100)));
    // console.log(prev.get('mainItemTotals')?.toJS());
    prev = prev.update('itemScores', (0, immutable_1.Map)(), (m) => m.map((val) => {
        let total = 1;
        let numMods = 0;
        const mainScore = (prev.getIn(['mainItemTotals', val.get('mainCat'), val.get('mainItem')]));
        total *= val.get('brokenDown')
            .entrySeq()
            .toArray()
            .map(([k, v]) => {
            if (v !== 'None') {
                numMods += 1;
            }
            return prev.getIn(['mainModTotals', val.get('mainItem'), k, v]);
        })
            .reduce((p, n) => p * (n + mainScore));
        const numModsBoost = prev.getIn(['numModTotals', numMods]);
        return val.set('score', total * numModsBoost);
    }));
    return prev;
}
exports.default = updateScores;
