import {Command} from '@colyseus/command'
import {Client} from 'colyseus'
import {IBall8PoolState, GameState} from '../../types/IBall8PoolState'

//import CheckWinnerCommand from './CheckWinnerCommand'

type Payload = {
    client: Client
    psdata: any
}

export default class PlayerSelectionCommand extends Command<IBall8PoolState, Payload> {
    execute(data: Payload) {
        const {client, psdata} = data

        if (this.room.state.gameState !== GameState.Playing) {
            return
        }

        const clientIndex = this.room.clients.findIndex(c => c.id === client.id)
        if (clientIndex !== this.room.state.activePlayer) {
            return
        }

        //set state values here on the basis of psdata

        this.room.state.balls = psdata.balls

        // return [
        // 	new CheckWinnerCommand()
        // ]
    }
}
