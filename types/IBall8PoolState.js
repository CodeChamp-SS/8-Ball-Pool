"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
var GameState;
(function (GameState) {
    GameState[GameState["WaitingForPlayers"] = 0] = "WaitingForPlayers";
    GameState[GameState["Playing"] = 1] = "Playing";
    GameState[GameState["Finished"] = 2] = "Finished";
})(GameState = exports.GameState || (exports.GameState = {}));
//export default IBall8PoolState
