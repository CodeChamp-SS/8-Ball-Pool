import {Schema, Context, ArraySchema, type} from "@colyseus/schema";
import { ballCords } from "../../../constants/ball8pool";
import { IBallPosition, IBall8PoolState,  GameState } from '../../../types/IBall8PoolState';



export class Ball8PoolState extends Schema implements IBall8PoolState {
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
        //initial state values
        this.balls = new ArraySchema() 
        ballCords.forEach((ball)=>{
            this.balls.push({
                x: ball[0],
                y: ball[1],
                isPotted: false
            })
        })
        this.ballsPotted = new ArraySchema()
        this.isWhitePotted = false
        this.isBlackPotted = false
    }
}
