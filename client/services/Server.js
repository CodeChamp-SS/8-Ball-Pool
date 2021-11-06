import { IBall8PoolState,  GameState } from '../../types/IBall8PoolState'
import { Message } from '../../types/messages'

export default class Server {
    constructor() {
        this._playerIndex = -1
        this.client = new Colyseus.Client('ws://localhost:2567')
        this.events = new Phaser.Events.EventEmitter()
    }
    
    get playerIndex() {
        return this._playerIndex
    }

    get gameState() {
        if (!this.room) {
            return GameState.WaitingForPlayers
        }
        return this.room?.state.gameState
    }

    async join() {
        this.room = await this.client.joinOrCreate('ball-8-pool')
        
        //message: { playerIndex: number }
        this.room.onMessage(Message.PlayerIndex, (message) => {
            console.log(message.playerIndex)
            this._playerIndex = message.playerIndex
        })

        this.room.onStateChange.once(state => {
            this.events.emit('once-state-changed', state)
        })

        this.room.state.onChange = (changes) => {
            changes.forEach(change => {
                console.log(change)
                const {field, value} = change

                switch (field) {
                    // case 'balls':
                    // 	this.events.emit('board-changed', value)
                    // 	break

                    case 'activePlayer':
                        this.events.emit('player-turn-changed', value)
                        break

                    case 'winningPlayer':
                        this.events.emit('player-win', value)
                        break

                    case 'gameState':
                        this.events.emit('game-state-changed', value)
                        break
                }
            })
        }

        this.room.state.balls.onChange = (item, idx) => {
            this.events.emit('board-changed', item, idx)
        }
    }

    leave() {
        this.room?.leave()
        this.events.removeAllListeners()
    }
    //idx: number
    makeSelection(idx) {
        if (!this.room) {
            return
        }

        if (this.room.state.gameState !== GameState.Playing) {
            return
        }

        if (this.playerIndex !== this.room.state.activePlayer) {
            console.warn('not this player\'s turn')
            return
        }

        this.room.send(Message.PlayerSelection, {index: idx})
    }
    
    //state: IBall8PoolState
    //cb: (state) => void, context?: any
    onceStateChanged(cb, context){
        this.events.once('once-state-changed', cb, context)
    }
    //cb: (cell: number, index: number) => void, context?: any    
    onBoardChanged(cb, context) {
        this.events.on('board-changed', cb, context)
    }
    //cb: (playerIndex: number) => void, context?: any
    onPlayerTurnChanged(cb, context) {
        this.events.on('player-turn-changed', cb, context)
    }
    //cb: (playerIndex: number) => void, context?: any
    onPlayerWon(cb, context) {
        this.events.on('player-win', cb, context)
    }
    //cb: (state: GameState) => void, context?: any
    onGameStateChanged(cb, context) {
        this.events.on('game-state-changed', cb, context)
    }
}
