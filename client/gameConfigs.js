import Scene_8BallPoolMulti from './scenes/Scene_8BallPoolMulti.ts'
import GameOver from './scenes/GameOver.ts'
import Bootstrap from './scenes/Bootstrap.ts'

var config = {
    type: Phaser.AUTO,
    width: window.screen.width,
    height: 780,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0 },
            debug: true
        },
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [Scene_8BallPoolMulti, Bootstrap, GameOver],
};

var game = new Phaser.Game(config);
console.log(game.scene.scenes)
console.log(game)
