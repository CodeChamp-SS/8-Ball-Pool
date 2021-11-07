import {Schema, Context, ArraySchema, type} from "@colyseus/schema";
import {ballCords} from "../../../constants/ball8pool";
import {IBallPosition, IBall8PoolState, GameState} from '../../../types/IBall8PoolState';


class BallPosition extends Schema implements IBallPosition {
    @type("boolean") isPotted: boolean;
    @type("number") x: number;
    @type("number") y: number;

    constructor(x: number, y: number, isPotted = false) {
        super();
        this.x = x;
        this.y = y;
        this.isPotted = isPotted;
    }
}


export class Ball8PoolState extends Schema implements IBall8PoolState {
    @type('number')
    gameState = GameState.WaitingForPlayers

    @type([BallPosition])
    balls: ArraySchema<BallPosition>

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
        this.balls = new ArraySchema<BallPosition>()
        ballCords.forEach((ball) => {
            // const ballPosition: IBallPosition = {
            //     isPotted: false,
            //     x: ball[0],
            //     y: ball[1]
            // }
            this.balls.push(new BallPosition(ball[0], ball[1]))
        })
        this.ballsPotted = new ArraySchema()
        this.isWhitePotted = false
        this.isBlackPotted = false
    }
}
