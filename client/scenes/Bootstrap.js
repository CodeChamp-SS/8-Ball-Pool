import Server from '../services/Server.js'

export default class Bootstrap extends Phaser.Scene {
    //private server!: Server

    constructor() {
        super('bootstrap')
    }

    init() {
        this.server = new Server()
    }

    create() {
        this.createNewGame()
    }
    //data: IGameOverSceneData
    handleGameOver = (data) => {
        this.server.leave()
        this.scene.stop('game')

        this.scene.launch('game-over', {
            ...data,
            onRestart: this.handleRestart
        })
    }

    handleRestart = () => {
        this.scene.stop('game-over')
        this.createNewGame()
    }

    createNewGame() {
        this.scene.launch('game', {
            server: this.server,
            onGameOver: this.handleGameOver
        })
    }
}
