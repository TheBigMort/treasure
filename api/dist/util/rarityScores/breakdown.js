"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-destructuring */
const immutable_1 = require("immutable");
const items_1 = __importDefault(require("./items"));
const types_1 = require("./types");
function breakdown(items) {
    const itemBreakdown = (itemStr) => {
        const splits = itemStr.split(' of ');
        let tail = '';
        let rest = '';
        if (splits.length > 1) {
            if (splits.length > 2)
                throw Error(`more than one tail detected: ${itemStr}`);
            tail = ` of ${splits[1]}`;
            rest = splits[0];
        }
        else {
            rest = itemStr;
        }
        let mainItem;
        let mainCat;
        const itemMap = (0, immutable_1.Map)((0, immutable_1.List)(Object.entries(items_1.default.MAIN).map(([k, v]) => [
            k,
            (0, immutable_1.List)(v.title),
        ])).concat(Object.entries(items_1.default.MOD).map(([k, v]) => [
            k,
            (0, immutable_1.List)(v.title),
        ])));
        let temp = rest.trim().split(' ');
        if (temp[0] === 'Rich' && temp[1] === "Man's") {
            temp = [[temp[0], temp[1]].join(' '), ...temp.slice(2)];
        }
        const broken = (0, immutable_1.Map)(temp
            .concat(tail)
            .filter((str) => str.length > 0)
            .map((part, _, arr) => {
            const found = itemMap.findEntry((val) => val.contains(part.trim()));
            if (!found)
                throw Error(`element not found.\nItem: ${itemStr}\nPart:${part}\n${arr}`);
            if (Array.from(types_1.mainCats).includes(found[0])) {
                mainItem = part;
                mainCat = found[0];
            }
            return [found[0], part.trim()];
        })).filterNot((val) => val === mainItem);
        if (!mainItem || !mainCat)
            throw Error(`couldnt find main item`);
        return (0, immutable_1.Map)({
            item: itemStr,
            mainCat,
            mainItem,
            brokenDown: (0, immutable_1.Map)({
                POSSESSIVE: broken.get('POSSESSIVE', 'None'),
                EXTRA: broken.get('EXTRA', 'None'),
                MATERIAL: broken.get('MATERIAL', 'None'),
                TAIL: broken.get('TAIL', 'None'),
            }),
        });
    };
    return (0, immutable_1.Map)(items.map((item) => [item, itemBreakdown(item)]));
}
exports.default = breakdown;
