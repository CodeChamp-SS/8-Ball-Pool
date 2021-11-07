import {Room, Client} from "colyseus";
import {Ball8PoolState} from "./schema/Ball8PoolState";
import {Dispatcher} from '@colyseus/command'
import {Message} from '../../types/messages'
import PlayerSelectionCommand from '../commands/PlayerSelectionCommand'
import {GameState} from '../../types/IBall8PoolState'

export class Ball8PoolRoom extends Room<Ball8PoolState> {

    private dispatcher = new Dispatcher(this)

    onCreate(options: any) {
        this.maxClients = 2
        this.setState(new Ball8PoolState());

        //receive message
        //Message.PlayerStateData
        this.onMessage("0", (client, message) => {
            //dispatch the command to update state value
            this.dispatcher.dispatch(new PlayerSelectionCommand(), {
                client,
                psdata: message.data
            })
        });
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
        const idx = this.clients.findIndex(c => c.sessionId === client.sessionId)
        console.log(idx)
        client.send(Message.PlayerIndex, {playerIndex: idx})

        if (this.clients.length >= 2) {
            this.state.gameState = GameState.Playing
            this.lock()
        }
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

}
