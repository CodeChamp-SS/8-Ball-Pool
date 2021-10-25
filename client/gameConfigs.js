import Scene_8BallPool from './scenes/intro.js'

var config = {
    type: Phaser.AUTO,
    width: window.screen.width,
    height: 780,
    physics: {
        default: 'arcade',
        matter: {
            gravity: { y: 0 },
            debug: true
        },
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [Scene_8BallPool],
};

var game = new Phaser.Game(config);