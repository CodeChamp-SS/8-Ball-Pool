 export default class Scene_8BallPool extends Phaser.Scene {
    constructor() {
        super("Scene_8BallPool");
    }

    preload() {
        // this.load.setBaseURL('http://labs.phaser.io');
        // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'assets/particles/red.png');

        this.scale.scaleMode = Phaser.Scale.CENTER_BOTH;
        this.load.image('board', 'assets/table.png');
        this.load.spritesheet('ball_1',
            'assets/ball_1.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_2',
            'assets/ball_2.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_3',
            'assets/ball_3.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_4',
            'assets/ball_4.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_5',
            'assets/ball_5.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_6',
            'assets/ball_6.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_7',
            'assets/ball_7.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_8',
            'assets/ball_8.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_9',
            'assets/ball_9.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_10',
            'assets/ball_10.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_11',
            'assets/ball_11.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_12',
            'assets/ball_12.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_13',
            'assets/ball_13.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_14',
            'assets/ball_14.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_15',
            'assets/ball_15.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('ball_16',
            'assets/ball_16.png',
            {frameWidth: 145, frameHeight: 141}
        );
        this.load.spritesheet('cue',
            'assets/cue.png',
            {frameWidth: 694, frameHeight: 20}
        );
    }

    create() {
        let board = this.add.image(0, 0, 'board');
        board.setOrigin(0, 0)
        board.displayWidth = this.sys.canvas.width
        board.displayHeight = this.sys.canvas.height

        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.scale.pageAlignHorizontally = true;
        // game.scale.pageAlignVertically = true;

        let ball_1 = this.physics.add.sprite(950, 350, 'ball_1')
        ball_1.setOrigin(0, 0)
        ball_1.displayHeight = 60
        ball_1.displayWidth = 60
        let ball_2 = this.physics.add.sprite(1000, 320, 'ball_2')
        ball_2.setOrigin(0, 0)
        ball_2.displayHeight = 60
        ball_2.displayWidth = 60
        let ball_3 = this.physics.add.sprite(1050, 290, 'ball_3')
        ball_3.setOrigin(0, 0)
        ball_3.displayHeight = 60
        ball_3.displayWidth = 60
        let ball_4 = this.physics.add.sprite(1100, 260, 'ball_4')
        ball_4.setOrigin(0, 0)
        ball_4.displayHeight = 60
        ball_4.displayWidth = 60
        let ball_12 = this.physics.add.sprite(1150, 230, 'ball_12')
        ball_12.setOrigin(0, 0)
        ball_12.displayHeight = 60
        ball_12.displayWidth = 60
        let ball_9 = this.physics.add.sprite(1000, 380, 'ball_9')
        ball_9.setOrigin(0, 0)
        ball_9.displayHeight = 60
        ball_9.displayWidth = 60
        let ball_10 = this.physics.add.sprite(1050, 410, 'ball_10')
        ball_10.setOrigin(0, 0)
        ball_10.displayHeight = 60
        ball_10.displayWidth = 60
        let ball_11 = this.physics.add.sprite(1100, 440, 'ball_11')
        ball_11.setOrigin(0, 0)
        ball_11.displayHeight = 60
        ball_11.displayWidth = 60
        let ball_5 = this.physics.add.sprite(1150, 470, 'ball_5')
        ball_5.setOrigin(0, 0)
        ball_5.displayHeight = 60
        ball_5.displayWidth = 60
        let ball_8 = this.physics.add.sprite(1052, 350, 'ball_8')
        ball_8.setOrigin(0, 0)
        ball_8.displayHeight = 60
        ball_8.displayWidth = 60
        let ball_14 = this.physics.add.sprite(1102, 320, 'ball_14')
        ball_14.setOrigin(0, 0)
        ball_14.displayHeight = 60
        ball_14.displayWidth = 60
        let ball_6 = this.physics.add.sprite(1152, 290, 'ball_6')
        ball_6.setOrigin(0, 0)
        ball_6.displayHeight = 60
        ball_6.displayWidth = 60
        let ball_7 = this.physics.add.sprite(1102, 380, 'ball_7')
        ball_7.setOrigin(0, 0)
        ball_7.displayHeight = 60
        ball_7.displayWidth = 60
        let ball_13 = this.physics.add.sprite(1152, 410, 'ball_13')
        ball_13.setOrigin(0, 0)
        ball_13.displayHeight = 60
        ball_13.displayWidth = 60
        let ball_15 = this.physics.add.sprite(1152, 350, 'ball_15')
        ball_15.setOrigin(0, 0)
        ball_15.displayHeight = 60
        ball_15.displayWidth = 60
        let ball_16 = this.physics.add.sprite(342, 350, 'ball_16')
        ball_16.setOrigin(0, 0)
        ball_16.displayHeight = 60
        ball_16.displayWidth = 60
        let cue = this.physics.add.sprite(250, 370, 'cue')
        cue.setOrigin(0, 0)

        // var particles = this.add.particles('red');
        //
        // var emitter = particles.createEmitter({
        //     speed: 200,
        //     scale: { start: 1, end: 0 },
        //     blendMode: 'ADD'
        // });
        //
        // var logo = this.physics.add.image(400, 100, 'logo');
        //
        // logo.setVelocity(100, 200);
        // logo.setBounce(1, 1);
        // logo.setCollideWorldBounds(true);
        //
        // emitter.startFollow(logo);
    }
    
    

}
