import Bootstrap from './scenes/Bootstrap.js'
import Scene_8BallPool from './scenes/Scene_8BallPoolMulti.js'
import GameOver from './scenes/GameOver.js'

const config = {
    type: Phaser.AUTO,
    width: window.screen.width,
    height: 780,
    physics: {
        default: 'matter',
        matter: {
            gravity: {y: 0},
            debug: true
        },
        arcade: {
            gravity: {y: 0},
            debug: true
        }
    },
    scene: [Bootstrap, Scene_8BallPool, GameOver]
}

//export default new Phaser.Game(config)
const game = new Phaser.Game(config)