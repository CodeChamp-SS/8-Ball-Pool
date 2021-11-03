import { Command } from '@colyseus/command'
import {IBall8PoolState} from '../../types/IBall8PoolState'

export default class NextTurnCommand extends Command<IBall8PoolState>
{
	execute()
	{
		const activePlayer = this.room.state.activePlayer

		if (activePlayer === 0)
		{
			this.room.state.activePlayer = 1
		}
		else
		{
			this.room.state.activePlayer = 0
		}
	}
}