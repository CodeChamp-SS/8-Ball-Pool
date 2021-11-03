import { Schema, ArraySchema } from '@colyseus/schema'

export interface IBallPosition
{
	isPotted ?: boolean
	x : number,
	y : number
}

export enum GameState
{
	WaitingForPlayers,
	Playing,
	Finished
}

export interface IBall8PoolState extends Schema
{
	gameState: GameState
	
	balls: ArraySchema<IBallPosition>

	ballsPotted: ArraySchema<number>

	isWhitePotted : boolean

	isBlackPotted : boolean

	activePlayer: number

	winningPlayer: number
}

//export default IBall8PoolState
