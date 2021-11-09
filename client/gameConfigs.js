import Scene_8BallPool from './scenes/Scene8BallPool.js'
import Scene_9BallPool from "./scenes/Scene9BallPool.js"

var config = {
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
    scene: [Scene_8BallPool, Scene_9BallPool],
};

var game = new Phaser.Game(config);
console.log(game.scene.scenes)
console.log(game)
