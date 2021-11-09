import {Schema, Context, ArraySchema, type} from "@colyseus/schema";
import {IBall8PoolState, GameState, IHitParams} from '../../../types/IBall8PoolState';

export class HitParams extends Schema implements IHitParams {
    @type("number") cueAngle: number;
    @type("number") delAngle: number;
    @type("number") hitSpeed: number;
    @type("number") duration: number;
    @type("number") x: number;
    @type("number") y: number;

    constructor(cueAngle = 0, delAngle = 0, hitSpeed = 0, duration = 0, x = 0, y = 0) {
        super();
        this.cueAngle = cueAngle;
        this.delAngle = delAngle;
        this.hitSpeed = hitSpeed;
        this.duration = duration;
        this.x = x
        this.y = y
    }
}

export class Ball8PoolState extends Schema implements IBall8PoolState {
    @type('number')
    gameState = GameState.WaitingForPlayers

    @type(HitParams)
    hit: HitParams

    @type(['number'])
    cueFinalPosition : ArraySchema<number>

    @type(['number'])
    ballsPotted: ArraySchema<number>

    @type('boolean')
    isWhitePotted: boolean

    @type('boolean')
    isBlackPotted: boolean

    @type('number')
    activePlayer = 0

    @type('number')
    winningPlayer = -1

    constructor() {
        super()
        //initial state values
        this.ballsPotted = new ArraySchema()
        this.isWhitePotted = false
        this.isBlackPotted = false
        this.hit = new HitParams()
        this.cueFinalPosition = new ArraySchema()
    }
}
