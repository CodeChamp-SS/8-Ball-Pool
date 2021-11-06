import Scene_9BallPool from './scenes/9Ball.js'

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
    scene: [Scene_9BallPool],
};

var game = new Phaser.Game(config);
console.log(game.scene.scenes)
console.log(game)
