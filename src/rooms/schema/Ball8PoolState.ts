import {Schema, Context, ArraySchema, type} from "@colyseus/schema";
import {IBall8PoolState, GameState, IHitParams} from '../../../types/IBall8PoolState';

export class HitParams extends Schema implements IHitParams {
    @type("number") cueAngle: number;
    @type("number") delAngle: number;
    @type("number") hitSpeed: number;
    @type("number") duration: number;

    constructor(cueAngle = 0, delAngle = 0, hitSpeed = 0, duration = 0) {
        super();
        this.cueAngle = cueAngle;
        this.delAngle = delAngle;
        this.hitSpeed = hitSpeed;
        this.duration = duration;
    }
}


export class Ball8PoolState extends Schema implements IBall8PoolState {
    @type('number')
    gameState = GameState.WaitingForPlayers

    @type(HitParams)
    hit: HitParams

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
    }
}
