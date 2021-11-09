import {Command} from '@colyseus/command'
import {Client} from 'colyseus'
import {GameState, IBall8PoolState} from '../../types/IBall8PoolState'
//import CheckWinnerCommand from './CheckWinnerCommand'

type Payload = {
    client: Client
    cueFinalPosition: any
}

export default class SetCueStateCommand extends Command<IBall8PoolState, Payload> {
    execute(data: Payload) {
        const {client, cueFinalPosition} = data

        if (this.room.state.gameState !== GameState.Playing) {
            return
        }

        const clientIndex = this.room.clients.findIndex(c => c.id === client.id)
        if (clientIndex !== this.room.state.activePlayer) {
            return
        }

        //set state values here on the basis of psdata

        // console.log(cueFinalPosition)
        this.room.state.cueFinalPosition = cueFinalPosition

        // return [
        // 	new CheckWinnerCommand()
        // ]
    }
}
