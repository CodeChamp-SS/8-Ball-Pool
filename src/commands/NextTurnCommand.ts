import { Command } from '@colyseus/command'
import {Client} from 'colyseus'
import {IBall8PoolState, GameState} from '../../types/IBall8PoolState'

type Payload = {
	client : Client 
	changeTurn: boolean
}

export default class NextTurnCommand extends Command<IBall8PoolState, Payload>
{
	execute(data: Payload)
	{
		const {changeTurn, client} = data

		if (this.room.state.gameState !== GameState.Playing) {
            return
        }

        const clientIndex = this.room.clients.findIndex(c => c.id === client.id)
        if (clientIndex !== this.room.state.activePlayer) {
            return
        }

		const activePlayer = this.room.state.activePlayer

		if(changeTurn){
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
}