import {Schema, Context, ArraySchema, type} from "@colyseus/schema";
import { IBallPosition, IBall8PoolState,  GameState } from '../../../types/IBall8PoolState';

export class MyRoomState extends Schema implements IBall8PoolState {
    @type('number')
    gameState = GameState.WaitingForPlayers

    @type(['number'])
    balls: ArraySchema<IBallPosition>

    @type(['number'])
    ballsPotted: ArraySchema<number>

    @type(['boolean'])
    isWhitePotted: boolean

    @type(['boolean'])
    isBlackPotted: boolean

    @type('number')
    activePlayer = 0

    @type('number')
    winningPlayer = -1

    constructor() {
        super()

        this.balls = new ArraySchema() //enter initial position of each ball here
        this.ballsPotted = new ArraySchema()
        this.isWhitePotted = false
        this.isBlackPotted = false
    }
}
