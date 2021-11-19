import Scene_LowestBallPool from "./scenes/LowestBallPocketed.js";

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
    scene: [Scene_LowestBallPool],
};

var game = new Phaser.Game(config);
console.log(game.scene.scenes)
console.log(game)
