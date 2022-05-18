"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scores = void 0;
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-mutable-exports */
const immutable_1 = require("immutable");
// import { MClient } from '../mongo/types';
const addChests_1 = __importDefault(require("./addChests"));
const updateColors_1 = __importDefault(require("./updateColors"));
const updateScores_1 = __importDefault(require("./updateScores"));
exports.scores = rarityScores();
function rarityScores() {
    let s = (0, immutable_1.Map)();
    return {
        /*         initScores: async (mclient: MClient): Promise<void> => {
            s = (await mclient.getCachedScores()) ?? IMap();
        }, */
        addChests: (chests) => {
            s = (0, addChests_1.default)(chests, s);
        },
        getScores: () => s,
        recalibrate: () => {
            s = (0, addChests_1.default)([], s);
            s = (0, updateScores_1.default)(s);
            s = (0, updateColors_1.default)(s);
        },
    };
}
