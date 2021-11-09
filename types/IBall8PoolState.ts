import {Schema, ArraySchema} from '@colyseus/schema'

export enum GameState {
    WaitingForPlayers,
    Playing,
    Finished
}

export interface IHitParams {
    cueAngle: number,
    delAngle: number,
    hitSpeed: number,
    duration : number,
    x: number,
    y: number
}

export interface IBall8PoolState extends Schema {
    gameState: GameState

    hit: any

    cueFinalPosition : ArraySchema<number>

    ballsPotted: ArraySchema<number>

    isWhitePotted: boolean

    isBlackPotted: boolean

    activePlayer: number

    winningPlayer: number
}

//export default IBall8PoolState
