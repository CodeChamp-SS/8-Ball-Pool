import 'regenerator-runtime/runtime'
import Phaser from 'phaser'
import Bootstrap from './scenes/Bootstrap'
import Scene_8BallPool from './scenes/Scene_8BallPoolMulti'
import GameOver from './scenes/GameOver'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.screen.width,
    height: 780,
    physics: {
        default: 'matter',
        matter: {
            gravity: {y: 0},
            debug: false
        },
        arcade: {
            gravity: {y: 0},
            debug: true
        }
    },
    scene: [Bootstrap, Scene_8BallPool, GameOver]
}

export default new Phaser.Game(config)