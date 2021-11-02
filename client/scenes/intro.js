export default class Scene_8BallPool extends Phaser.Scene {
    constructor() {
        super("Scene_8BallPool");
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
        this.load.audio('ball_collision', ['assets/sounds/ball_collision.mp3'])
        this.load.audio('cushion_collision', ['assets/sounds/cushion_collision.mp3'])
        this.load.audio('foul', ['assets/sounds/foul.mp3'])
        this.load.audio('pocket', ['assets/sounds/pocket.mp3'])
        this.load.audio('cue_collision_strong', ['assets/sounds/cue_collision_strong.mp3'])
        this.load.audio('cue_collision_weak', ['assets/sounds/cue_collision_weak.mp3'])
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
            // ball.setVelocity(50, 0);
            // ball.setAngularVelocity(0)
            this.cueBall = ball
            ball.setCollisionCategory(this.cueBallCategory)
        } else {
            ball.setCollisionCategory(this.ballCategory)
        }
        this.balls.push(ball)
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
    }

    create() {
        let board = this.add.image(0, 0, 'board');
        board.setOrigin(0, 0)
        board.displayWidth = this.sys.canvas.width
        board.displayHeight = this.sys.canvas.height

        this.ballCategory = this.matter.world.nextCategory();
        this.cueCategory = this.matter.world.nextCategory();
        this.cueBallCategory = this.matter.world.nextCategory();
        this.cushionCategory = this.matter.world.nextCategory();
        this.potCategory = this.matter.world.nextCategory()

        // x: 95 y: 90
        // width: 1355 height: 600
        let boundary = this.matter.world.setBounds(35, 25, 1375, 730, 1)
        boundary.disableGravity();

        let cushion1 = this.matter.add.image(410, 55, 'platform');
        cushion1.setBody({
            type: 'trapezoid',
            slope: -0.1
        })
        cushion1.setVisible(false)
        cushion1.setBounce(0.9)
        cushion1.setStatic(true)
        cushion1.setFrictionStatic(0.1)
        cushion1.displayHeight = 65
        cushion1.displayWidth = 540
        cushion1.setCollisionCategory(this.cushionCategory)
        let cushion2 = this.matter.add.image(1045, 55, 'platform');
        cushion2.setBody({
            type: 'trapezoid',
            slope: -0.1
        })
        cushion2.setVisible(false)
        cushion2.setStatic(true)
        cushion2.setBounce(0.9)
        cushion2.setFrictionStatic(0.1)
        cushion2.displayHeight = 65
        cushion2.displayWidth = 540
        cushion2.setCollisionCategory(this.cushionCategory)
        let cushion3 = this.matter.add.image(1380, 390, 'platform');
        cushion3.setBody({
            type: 'trapezoid',
            slope: -0.2
        })
        cushion3.setRotation(Math.PI / 2)
        cushion3.setVisible(false)
        cushion3.setStatic(true)
        cushion3.setBounce(0.9)
        cushion3.setFrictionStatic(0.1)
        cushion3.displayHeight = 505
        cushion3.displayWidth = 60
        cushion3.setCollisionCategory(this.cushionCategory)
        let cushion4 = this.matter.add.image(65, 390, 'platform');
        cushion4.setBody({
            type: 'trapezoid',
            slope: 0.2
        })
        cushion4.setRotation(Math.PI / 2)
        cushion4.setVisible(false)
        cushion4.setStatic(true)
        cushion4.setBounce(0.9)
        cushion4.setFrictionStatic(0.1)
        cushion4.displayHeight = 615
        cushion4.displayWidth = 60
        cushion4.setCollisionCategory(this.cushionCategory)
        let cushion5 = this.matter.add.image(410, 725, 'platform');
        cushion5.setBody({
            type: 'trapezoid',
            slope: 0.1,
        })
        cushion5.setVisible(false)
        cushion5.setStatic(true)
        cushion5.setBounce(0.9)
        cushion5.setFrictionStatic(0.1)
        cushion5.displayHeight = 65
        cushion5.displayWidth = 595
        cushion5.setCollisionCategory(this.cushionCategory)
        let cushion6 = this.matter.add.image(1045, 725, 'platform');
        cushion6.setBody({
            type: 'trapezoid',
            slope: 0.1
        })
        cushion6.setVisible(false)
        cushion6.setStatic(true)
        cushion6.setBounce(0.9)
        cushion6.setFrictionStatic(0.1)
        cushion6.displayHeight = 65
        cushion6.displayWidth = 595
        cushion6.setCollisionCategory(this.cushionCategory)

        // pocket 1: 95, 85
        // pocket 2: 730, 75
        // pocket 3: 1355, 85
        // pocket 4: 1350, 695
        // pocket 5: 730, 705
        // pocket 6: 95, 695
        let pot1 = this.matter.add.image(70, 65, 'ball_1')
        pot1.setBody({
            type: 'circle',
            radius: 70,
        });
        pot1.setVisible(false)
        pot1.displayHeight = 45
        pot1.displayWidth = 45
        pot1.setStatic(true)
        pot1.setCollisionCategory(this.potCategory)
        let pot2 = this.matter.add.image(728, 40, 'ball_1')
        pot2.setBody({
            type: 'circle',
            radius: 70,
        });
        pot2.setVisible(false)
        pot2.setStatic(true)
        pot2.displayHeight = 45
        pot2.displayWidth = 45
        pot2.setCollisionCategory(this.potCategory)
        let pot3 = this.matter.add.image(1380, 65, 'ball_1')
        pot3.setBody({
            type: 'circle',
            radius: 70,
        });
        pot3.setStatic(true)
        pot3.setVisible(false)
        pot3.displayHeight = 45
        pot3.displayWidth = 45
        pot3.setCollisionCategory(this.potCategory)
        let pot4 = this.matter.add.image(1380, 710, 'ball_1')
        pot4.setBody({
            type: 'circle',
            radius: 70,
        });
        pot4.setVisible(false)
        pot4.setStatic(true)
        pot4.displayHeight = 45
        pot4.displayWidth = 45
        pot4.setCollisionCategory(this.potCategory)
        let pot5 = this.matter.add.image(728, 740, 'ball_1')
        pot5.setBody({
            type: 'circle',
            radius: 70,
        });
        pot5.setVisible(false)
        pot5.setStatic(true)
        pot5.displayHeight = 45
        pot5.displayWidth = 45
        pot5.setCollisionCategory(this.potCategory)
        let pot6 = this.matter.add.image(70, 710, 'ball_1')
        pot6.setBody({
            type: 'circle',
            radius: 70,
        });
        pot6.setVisible(false)
        pot6.setStatic(true)
        pot6.displayHeight = 45
        pot6.displayWidth = 45
        pot6.setCollisionCategory(this.potCategory)

        this.balls = []
        this.createBalls()
        pot1.setCollidesWith([this.ballCategory, this.cueBallCategory])
        pot2.setCollidesWith([this.ballCategory, this.cueBallCategory])
        pot3.setCollidesWith([this.ballCategory, this.cueBallCategory])
        pot4.setCollidesWith([this.ballCategory, this.cueBallCategory])
        pot5.setCollidesWith([this.ballCategory, this.cueBallCategory])
        pot6.setCollidesWith([this.ballCategory, this.cueBallCategory])
        let potMask = pot1.body.collisionFilter.mask

        this.cue = this.matter.add.sprite(250, 370, 'cue')
        this.cue.setBody({
            type: 'trapezoid',
            slope: 0.5
        })
        this.cue.setBounce(1)
        this.cue.setMass(10)
        this.cue.setFrictionAir(0.5)
        this.cue.setRotation(Math.PI / 2)
        this.cue.setCollisionCategory(this.cueCategory)
        this.cue.setCollidesWith([this.cueBallCategory])
        let cueMask = this.cue.body.collisionFilter.mask
        let categories = [this.ballCategory, this.cueBallCategory, this.cushionCategory]

        cushion1.setCollidesWith(categories)
        cushion2.setCollidesWith(categories)
        cushion3.setCollidesWith(categories)
        cushion4.setCollidesWith(categories)
        cushion5.setCollidesWith(categories)
        cushion6.setCollidesWith(categories)
        categories.push(this.potCategory)
        this.balls.forEach(ball => {
            ball.setCollidesWith(categories)
        })
        categories.push(this.cueCategory)
        this.cueBallCollidesWith = categories
        this.cueBall.setCollidesWith(categories)

        this.matter.body.setPosition(this.cue.body, this.matter.vector.create(this.cueBall.body.position.x - 410, this.cueBall.body.position.y))

        this.cursors = this.input.keyboard.createCursorKeys();

        let ballCollision = this.sound.add('ball_collision', {loop: false})
        let cueCollisionWeak = this.sound.add('cue_collision_weak', {loop: false})
        let cueCollisionStrong = this.sound.add('cue_collision_strong', {loop: false})
        let cushionCollision = this.sound.add('cushion_collision', {loop: false})
        let foul = this.sound.add('foul', {loop: false})
        let pocket = this.sound.add('pocket', {loop: false})

        this.cueSpeed = 0

        this.input.on('pointerdown', this.startDrag, this)
        // this.input.on('pointerup', this.onRelease, this);

        this.matter.world.on("collisionstart", (event) => {
            event.pairs.forEach((pair) => {
                const {bodyA, bodyB} = pair;
                // console.log(bodyA.collisionFilter.mask)
                // console.log(bodyB.collisionFilter.mask)
                if (bodyA.collisionFilter.mask === potMask) {
                    if (bodyB.collisionFilter.mask !== this.cueBall.body.collisionFilter.mask) {
                        let ball = bodyB.gameObject
                        console.log(bodyB.gameObject)
                        bodyB.gameObject.destroy()
                        pocket.play()
                        let index = this.balls.indexOf(ball);
                        if (index !== -1) {
                            this.balls.splice(index, 1);
                        }
                    } else {
                        foul.play()
                        this.cueBall.setVelocity(0, 0)
                        this.cueBall.setToSleep().setInteractive().setVisible(false)
                        this.cue.setToSleep()
                        this.cueBall.setCollidesWith([])
                    }
                } else if (bodyB.collisionFilter.mask === potMask) {
                    if (bodyA.collisionFilter.mask !== this.cueBall.body.collisionFilter.mask) {
                        let ball = bodyA.gameObject
                        console.log(bodyA.gameObject)
                        bodyA.gameObject.destroy()
                        pocket.play()
                        let index = this.balls.indexOf(ball);
                        if (index !== -1) {
                            this.balls.splice(index, 1);
                            this.input.on('pointerDown', this.startDrag, this)
                        }
                    } else {
                        foul.play()
                        this.cueBall.setVelocity(0, 0)
                        this.cueBall.setToSleep().setInteractive().setVisible(false)
                        this.cue.setToSleep()
                        this.cueBall.setCollidesWith([])
                    }
                } else if (bodyA.collisionFilter.mask === cushion1.body.collisionFilter.mask || bodyB.collisionFilter.mask === cushion1.body.collisionFilter.mask) {
                    cushionCollision.play()
                } else if (bodyA.collisionFilter.mask === cueMask || bodyB.collisionFilter.mask === cueMask) {
                    cueCollisionStrong.play()
                } else ballCollision.play()
            });
        });

        this.graphics = this.add.graphics({lineStyle: {width: 4, color: 0xffffff}});
        this.graphics.alpha = 0.4
        this.hit = false
        this.moveLine = true
    }

    startDrag(pointer, targets) {
        this.input.off('pointerdown', this.startDrag, this);
        this.dragTarget = targets[0]
        this.graphics.clear()
        this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this);
    }

    doDrag(pointer) {
        this.dragTarget.x = pointer.x;
        this.dragTarget.y = pointer.y;
        this.matter.body.setPosition(this.cue.body, this.matter.vector.create(this.cueBall.body.position.x - 410, this.cueBall.body.position.y))
    }

    stopDrag() {
        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointermove', this.doDrag, this);
        this.input.off('pointerup', this.stopDrag, this);
        let ballPosition = this.cueBall.body.position
        this.graphics.clear()
        // console.log(ballPosition.x, ballPosition.y)
        this.line = new Phaser.Geom.Line(ballPosition.x, ballPosition.y, ballPosition.x + 1200, ballPosition.y)
        this.graphics.strokeLineShape(this.line)
        this.matter.body.setPosition(this.cue.body, this.matter.vector.create(ballPosition.x - 410, ballPosition.y))
    }

    onRelease(pointer) {
        if (pointer.leftButtonReleased()) {
            console.log('Left Button was released', this.cueSpeed);
            if (this.cueSpeed > 0) {
            }
        }
    }

    f(x) {
        return 50 / Math.pow(3, x) + 25
    }

    update() {
        let ballPosition = this.cueBall.body.position
        let moveCue = false

        let pointer = this.input.activePointer;
        // if(pointer.isDown) console.log("power increasing")

        this.balls.forEach(ball => {
            if (Math.abs(ball.body.velocity.x) > 1e-2 || Math.abs(ball.body.velocity.y) > 1e-2) {
                moveCue = true
            }
        })
        let cuePosition = this.cue.body.position
        let velocityVector = new Phaser.Math.Vector2(ballPosition.x - cuePosition.x, ballPosition.y - cuePosition.y)
        let angle = velocityVector.angle() + Math.PI / 2
        if (moveCue) {
            this.moveLine = true
            this.graphics.clear()
            this.cue.setVisible(false)
            this.matter.body.setPosition(this.cue.body, this.matter.vector.create(ballPosition.x - 410, ballPosition.y))
        } else {
            if (!this.cueBall.visible) {
                this.cueBall.setPosition(342, 350)
                ballPosition = this.cueBall.body.position
                this.matter.body.setPosition(this.cue.body, this.matter.vector.create(this.cueBall.body.position.x - 410, this.cueBall.body.position.y))
                this.cue.setAwake()
                this.cueBall.setVisible(true).setAwake()
            }

            // ballPosition.x + 1200, ballPosition.y
            if (this.moveLine) {
                ballPosition = this.cueBall.body.position
                console.log(ballPosition.x, ballPosition.y)
                this.line = new Phaser.Geom.Line(ballPosition.x, ballPosition.y, ballPosition.x + 1200, ballPosition.y)
                this.graphics.strokeLineShape(this.line)
                this.moveLine = false
            }
            this.cue.setVisible(true)
            this.cue.setRotation(angle)
        }
        if (this.cursors.left.isDown) {
            if (!moveCue) {
                this.graphics.clear()
                console.log(Phaser.Geom.Line.Angle(this.line))
                Phaser.Geom.Line.RotateAroundXY(this.line, ballPosition.x, ballPosition.y, -Math.PI / 180)
                console.log(Phaser.Geom.Line.Angle(this.line))
                this.graphics.strokeLineShape(this.line)
            }
            this.matter.body.rotate(this.cue.body, -Math.PI / 180, this.matter.vector.create(ballPosition.x, ballPosition.y))
        } else if (this.cursors.right.isDown) {
            if (!moveCue) {
                this.graphics.clear()
                Phaser.Geom.Line.RotateAroundXY(this.line, ballPosition.x, ballPosition.y, Math.PI / 180)
                this.graphics.strokeLineShape(this.line)
            }
            this.matter.body.rotate(this.cue.body, Math.PI / 180, this.matter.vector.create(ballPosition.x, ballPosition.y))
        }
        if (this.cursors.down.isDown) {
            console.log("power increasing")
            this.hit = true
            if (this.cursors.down.getDuration() <= 2000) {
                let v1 = new Phaser.Math.Vector2(this.cue.body.position)
                v1.subtract(new Phaser.Math.Vector2(this.cueBall.body.position))
                let velocityV = v1.normalize().scale(3)
                this.cue.setVelocity(velocityV.x, velocityV.y)
            }
        }
        // console.log(this.hit)
        if (this.cursors.down.isUp && this.hit) {
            this.hit = false
            let duration = this.cursors.down.duration
            duration = Math.min(duration, 2000)
            if (!moveCue) {
                let speed = ((duration + this.f(duration)) * 1.25) / 600
                speed = Math.min(speed, 4.5)
                console.log("speed = ", speed)
                // console.log(duration)
                this.cueBall.setCollidesWith(this.cueBallCollidesWith)
                this.cueBall.disableInteractive()
                this.matter.applyForceFromAngle(this.cue.body, speed, angle - Math.PI / 2)
            }
        }
    }
}
