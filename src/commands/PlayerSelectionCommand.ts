import {Command} from '@colyseus/command'
import {Client} from 'colyseus'
import {GameState, IBall8PoolState} from '../../types/IBall8PoolState'
import {HitParams} from "../rooms/schema/Ball8PoolState";
//import CheckWinnerCommand from './CheckWinnerCommand'

type Payload = {
    client: Client
    psData: any
}

export default class PlayerSelectionCommand extends Command<IBall8PoolState, Payload> {
    execute(data: Payload) {
        const {client, psData} = data

        if (this.room.state.gameState !== GameState.Playing) {
            return
        }

        const clientIndex = this.room.clients.findIndex(c => c.id === client.id)
        if (clientIndex !== this.room.state.activePlayer) {
            return
        }

        //set state values here on the basis of psdata

        console.log(psData.cueAngle, psData.delAngle, psData.hitSpeed, psData.duration)
        this.room.state.hit = new HitParams(psData.cueAngle, psData.delAngle, psData.hitSpeed, psData.duration)

        // return [
        // 	new CheckWinnerCommand()
        // ]
    }
}
