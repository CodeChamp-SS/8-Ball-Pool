// import {type} from "@colyseus/schema";

export default class Scene_8BallPool extends Phaser.Scene {
    constructor() {
        super("Scene_8BallPool");
        this.balls = []
        this.pockets = []
    }

    preload() {
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

    createBall(x, y, key) {
        let ball = this.matter.add.sprite(x, y, key)
        ball.setBody({
            type: 'circle',
            radius: 70,
        });
        ball.displayHeight = 45
        ball.displayWidth = 45
        ball.setBounce(0.9);
        ball.setFriction(0, 0.008, 0.1);
        if (key === 'ball_16') {
            ball.setVelocity(30, 0);
            ball.setAngularVelocity(0)
            this.cueBall = ball
        } else ball.setVelocity(0, 0);
        this.balls.push(ball)
        // ball.setCollisionCategory(this.ballCategory)
        // ball.setCollidesWith(this.ballCategory)
        // let posv = ball.body.position
        // let v1 = new Phaser.Math.Vector2(2, 5)
    }

    createBalls() {
        this.createBall(950, 350, 'ball_1')
        this.createBall(1000, 320, 'ball_2')
        this.createBall(1050, 290, 'ball_3')
        this.createBall(1100, 260, 'ball_4')
        this.createBall(1150, 230, 'ball_12')
        this.createBall(1000, 380, 'ball_9')
        this.createBall(1050, 410, 'ball_10')
        this.createBall(1100, 440, 'ball_11')
        this.createBall(1150, 470, 'ball_5')
        this.createBall(1052, 350, 'ball_8')
        this.createBall(1102, 320, 'ball_14')
        this.createBall(1152, 290, 'ball_6')
        this.createBall(1102, 380, 'ball_7')
        this.createBall(1152, 410, 'ball_13')
        this.createBall(1152, 350, 'ball_15')
        this.createBall(342, 350, 'ball_16')
        // console.log(this.balls)
    }

    create() {
        let board = this.add.image(0, 0, 'board');
        board.setOrigin(0, 0)
        board.displayWidth = this.sys.canvas.width
        board.displayHeight = this.sys.canvas.height


        // x: 95 y: 90
        // width: 1355 height: 600
        let boundary = this.matter.world.setBounds(35, 25, 1450, 730, 1)
        boundary.disableGravity();

        let cushion1 = this.matter.add.image(435, 55, 'platform');          //top left
        cushion1.setBody({
            type: 'trapezoid',
            slope: -0.15
        })
        cushion1.setVisible(false)
        cushion1.setBounce(0.9)
        cushion1.setStatic(true)
        cushion1.setFrictionStatic(0.1)
        cushion1.displayHeight = 65
        cushion1.displayWidth = 575
        let cushion2 = this.matter.add.image(1100, 55, 'platform');         //top right
        cushion2.setBody({
            type: 'trapezoid',
            slope: -0.12
        })
        cushion2.setVisible(false)
        cushion2.setStatic(true)
        cushion2.setBounce(0.9)
        cushion2.setFrictionStatic(0.1)
        cushion2.displayHeight = 65
        cushion2.displayWidth = 567
        let cushion3 = this.matter.add.image(1455, 390, 'platform');        //right
        cushion3.setBody({
            type: 'trapezoid',
            slope: -0.24
        })
        cushion3.setRotation(Math.PI / 2)
        cushion3.setVisible(false)
        cushion3.setStatic(true)
        cushion3.setBounce(0.9)
        cushion3.setFrictionStatic(0.1)
        cushion3.displayHeight = 505
        cushion3.displayWidth = 60
        let cushion4 = this.matter.add.image(60, 390, 'platform');      //left
        cushion4.setBody({
            type: 'trapezoid',
            slope: 0.2
        })
        cushion4.setRotation(Math.PI / 2)
        cushion4.setVisible(false)
        cushion4.setStatic(true)
        cushion4.setBounce(0.9)
        cushion4.setFrictionStatic(0.1)
        cushion4.displayHeight = 640
        cushion4.displayWidth = 70
        let cushion5 = this.matter.add.image(432, 725, 'platform');     //bottom left
        cushion5.setBody({
            type: 'trapezoid',
            slope: 0.15,
        })
        cushion5.setVisible(false)
        cushion5.setStatic(true)
        cushion5.setBounce(0.9)
        cushion5.setFrictionStatic(0.1)
        cushion5.displayHeight = 65
        cushion5.displayWidth = 665
        let cushion6 = this.matter.add.image(1103, 725, 'platform');        //bottom right
        cushion6.setBody({
            type: 'trapezoid',
            slope: 0.15
        })
        cushion6.setVisible(false)
        cushion6.setStatic(true)
        cushion6.setBounce(0.9)
        cushion6.setFrictionStatic(0.1)
        cushion6.displayHeight = 65
        cushion6.displayWidth = 663

        this.createBalls()

        this.cursors = this.input.keyboard.createCursorKeys();
        // this.ballCategory = this.matter.world.nextCategory();
        // this.cueCategory = this.matter.world.nextCategory();

        this.cue = this.matter.add.sprite(250, 370, 'cue')
        this.cue.setBody({
            type: 'trapezoid',
            slope: 0.5
        })
        this.cue.setRotation(Math.PI / 2)
        this.cue.setCollidesWith([])

        let pocket_1 = this.matter.add.sprite(80, 72, 'pocket_1')       //top left
        let pocket_2 = this.matter.add.sprite(768, 59, 'pocket_2')      //top centre
        let pocket_3 = this.matter.add.sprite(1449, 70, 'pocket_3')     //top right
        let pocket_4 = this.matter.add.sprite(80, 709, 'pocket_4')      //bottom left
        let pocket_5 = this.matter.add.sprite(1449, 709, 'pocket_5')    //bottom centre
        let pocket_6 = this.matter.add.sprite(768, 725, 'pocket_6')     //bottom right
        /*this.pocket_1.setStatic(true)
        this.pocket_2.setStatic(true)
        this.pocket_3.setStatic(true)
        this.pocket_4.setStatic(true)
        this.pocket_5.setStatic(true)
        this.pocket_6.setStatic(true)*/
        // this.pockets = []
        this.pockets.push(pocket_1)
        this.pockets.push(pocket_2)
        this.pockets.push(pocket_3)
        this.pockets.push(pocket_4)
        this.pockets.push(pocket_5)
        this.pockets.push(pocket_6)
        console.log(typeof this.pockets)
        this.pockets.forEach((pocket) => {
            pocket.setBody({
                type: 'circle',
                radius: 10,
            });
            pocket.setStatic(true)
        })
    }

    update() {
        let ballPosition = this.cueBall.body.position
        if (Math.abs(this.cueBall.body.velocity.x) > 1e-2 || Math.abs(this.cueBall.body.velocity.y) > 1e-2) {
            this.cue.setVisible(false)
            this.matter.body.setPosition(this.cue.body, this.matter.vector.create(ballPosition.x - 420, ballPosition.y))
        } else this.cue.setVisible(true)

        if (this.cursors.left.isDown) this.matter.body.rotate(this.cue.body, -Math.PI / 180, this.matter.vector.create(ballPosition.x, ballPosition.y))
        else if (this.cursors.right.isDown) this.matter.body.rotate(this.cue.body, Math.PI / 180, this.matter.vector.create(ballPosition.x, ballPosition.y))
    }
}
