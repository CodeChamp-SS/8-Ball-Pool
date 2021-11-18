export default class Scene_9BallPool extends Phaser.Scene {
    constructor() {
        super("Scene_9BallPool");
    }

    preload() {
        this.scale.scaleMode = Phaser.Scale.CENTER_BOTH;
        this.load.image('board', 'assets/table.png');
        this.load.image('gameOver', 'assets/gameOver.jpg')
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
        this.load.audio('game_over', ['assets/sounds/win.mp3'])
    }

    createBall(x, y, key) {
        let ball = this.matter.add.sprite(x, y, key)
        ball.displayHeight = 45
        ball.displayWidth = 45
        ball.setBody({
            type: 'circle',
            radius: 22.5,
        });
        ball.setBounce(1);
        ball.setFriction(0, 0.01, 0.1);
        if (key === 'ball_16') {
            this.cueBall = ball
            ball.setCollisionCategory(this.cueBallCategory)
        } else {
            ball.setCollisionCategory(this.ballCategory)
        }
        if (this.reset9Ball) {
            this.balls.splice(this.balls.length - 1, 0, ball)
            console.log(this.balls.indexOf(ball))
        } else this.balls.push(ball)
    }

    createBalls() {
        this.createBall(960, 350, 'ball_1')
        this.createBall(1000, 370, 'ball_2')
        this.createBall(1000, 330, 'ball_3')
        this.createBall(1040, 395, 'ball_4')
        this.createBall(1040, 305, 'ball_5')
        this.createBall(1080, 370, 'ball_6')
        this.createBall(1082, 327, 'ball_7')
        this.createBall(1120, 355, 'ball_8')
        this.createBall(1040, 350, 'ball_9')
        this.createBall(370, 350, 'ball_16')
    }

    createCushion(x, y, sideSlope, height, width, angle = 0) {
        let cushion = this.matter.add.image(x, y, '');
        cushion.setBody({
            type: 'trapezoid',
            slope: sideSlope
        })
        cushion.setRotation(angle)
        cushion.setVisible(false)
        cushion.setBounce(0.9)
        cushion.setStatic(true)
        cushion.setFrictionStatic(0.1)
        cushion.displayHeight = height
        cushion.displayWidth = width
        cushion.setCollisionCategory(this.cushionCategory)
        cushion.setCollidesWith([this.ballCategory, this.cueBallCategory])
        return cushion
    }

    createPot(x, y) {
        let pot = this.matter.add.image(x, y, 'ball_1')
        pot.setBody({
            type: 'circle',
            radius: 70,
        });
        pot.setVisible(false)
        pot.displayHeight = 45
        pot.displayWidth = 45
        pot.setStatic(true)
        pot.setCollisionCategory(this.potCategory)
        pot.setCollidesWith([this.ballCategory, this.cueBallCategory])
        return pot
    }

    createRack() {
        this.ballRack = {}
        this.add.rectangle(400, 38, 550, 50, 0x000000, 0.7)
        for (let i = 0; i < 9; i++) {
            let ball = this.matter.add.sprite(160 + 60 * i, 40, `ball_${i + 1}`)
            ball.displayHeight = 40
            ball.displayWidth = 40
            ball.setBody({
                type: 'circle',
                radius: 20
            })
            ball.setStatic(true)
            this.ballRack[this.balls[i].texture.key] = ball
        }
        console.log(this.ballRack)
    }

    create() {
        this.board = this.add.image(0, 0, 'board');
        this.board.setOrigin(0, 0)
        this.board.displayWidth = this.sys.canvas.width
        this.board.displayHeight = this.sys.canvas.height

        this.ballCategory = this.matter.world.nextCategory();
        this.cueCategory = this.matter.world.nextCategory();
        this.cueBallCategory = this.matter.world.nextCategory();
        this.cushionCategory = this.matter.world.nextCategory();
        this.potCategory = this.matter.world.nextCategory();

        let boundary = this.matter.world.setBounds(35, 25, 1375, 730, 1)
        boundary.disableGravity();

        let cushion1 = this.createCushion(410, 55, -0.1, 65, 540)
        let cushion2 = this.createCushion(1045, 55, -0.1, 65, 540)
        let cushion3 = this.createCushion(1380, 390, -0.2, 505, 60, Math.PI / 2)
        let cushion4 = this.createCushion(65, 390, 0.2, 615, 60, Math.PI / 2)
        let cushion5 = this.createCushion(410, 725, 0.1, 65, 595)
        let cushion6 = this.createCushion(1045, 725, 0.1, 65, 595)

        let pot1 = this.createPot(70, 65)
        let pot2 = this.createPot(728, 40)
        let pot3 = this.createPot(1380, 65)
        let pot4 = this.createPot(1380, 710)
        let pot5 = this.createPot(728, 740)
        let pot6 = this.createPot(70, 710)

        this.balls = []
        this.reset9Ball = false
        this.createBalls()
        this.createRack()

        let potMask = pot1.body.collisionFilter.category

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
        let cueMask = this.cue.body.collisionFilter.category
        let categories = [this.ballCategory, this.cueBallCategory, this.cushionCategory]
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
        this.foul = this.sound.add('foul', {loop: false})
        let pocket = this.sound.add('pocket', {loop: false})
        this.gameOverSound = this.sound.add('game_over', {loop: false})

        this.breakShot = true
        this.gameStarted = true
        this.input.on('pointerdown', this.startDrag, this)
        this.cueBall.setInteractive()

        this.noBallTouched = false
        this.noBallTouchedRest = true
        this.cushionTouchedAfterHittingBall = true
        this.lowestBallHit = true
        this.currentPlayer = 1
        this.playerSwitched = true
        this.ballPotted = true

        const style = {font: '18px'}
        this.turn = this.add.text(800, 30, "PLAYER 1's turn", style)

        this.matter.world.on("collisionstart", (event) => {
            event.pairs.forEach((pair) => {
                const {bodyA, bodyB} = pair;

                if (bodyA.collisionFilter.category === potMask) {
                    if (bodyB.collisionFilter.category !== this.cueBall.body.collisionFilter.category) {
                        this.ballPotted = true
                        pocket.play()
                        let ball = bodyB.gameObject
                        console.log(bodyB.gameObject)
                        if (ball.texture.key === 'ball_9') {
                            if (this.lowestBallHit) {
                                //game over, player wins if shot was legit
                                console.log(`Player ${this.currentPlayer} wins`)
                                console.log(`Player ${this.currentPlayer ^ 3} loses`)
                                this.gameOver()
                            } else this.reset9Ball = true
                        }
                        bodyB.gameObject.destroy()
                        this.cushionTouchedAfterHittingBall = true
                        let index = this.balls.indexOf(ball);
                        if (index !== -1) {
                            this.balls.splice(index, 1);
                            this.ballRack[ball.texture.key].destroy()
                            delete this.ballRack[ball.texture.key]
                            this.input.on('pointerDown', this.startDrag, this)
                        }
                    } else {
                        this.foulMade()
                    }
                } else if (bodyB.collisionFilter.category === potMask) {
                    if (bodyA.collisionFilter.category !== this.cueBall.body.collisionFilter.category) {
                        this.ballPotted = true
                        pocket.play()
                        let ball = bodyA.gameObject
                        console.log(bodyA.gameObject)
                        if (ball.texture.key === 'ball_9') {
                            if (this.lowestBallHit) {
                                //game over, player wins if shot was legit
                                console.log(`Player ${this.currentPlayer} wins`)
                                console.log(`Player ${this.currentPlayer ^ 3} loses`)
                                this.gameOver()
                            } else this.reset9Ball = true
                        }
                        bodyA.gameObject.destroy()
                        this.cushionTouchedAfterHittingBall = true
                        let index = this.balls.indexOf(ball);
                        if (index !== -1) {
                            this.balls.splice(index, 1);
                            this.ballRack[ball.texture.key].destroy()
                            delete this.ballRack[ball.texture.key]
                            this.input.on('pointerDown', this.startDrag, this)
                        }
                    } else {
                        this.foulMade()
                    }
                } else if (bodyA.collisionFilter.category === cushion1.body.collisionFilter.category || bodyB.collisionFilter.category === cushion1.body.collisionFilter.category) {
                    if (bodyA.collisionFilter.category === cushion1.body.collisionFilter.category) {
                        if (bodyB.collisionFilter.category !== this.cueBall.body.collisionFilter.category && !this.noBallTouched) {
                            //object ball hits the cushion
                            this.cushionTouchedAfterHittingBall = true
                            console.log('cushion touched')
                        }
                    } else {
                        if (bodyA.collisionFilter.category !== this.cueBall.body.collisionFilter.category && !this.noBallTouched) {
                            //object ball hits the cushion
                            this.cushionTouchedAfterHittingBall = true
                            console.log('cushion touched')
                        }
                    }
                    cushionCollision.play()
                } else if (bodyA.collisionFilter.category === cueMask || bodyB.collisionFilter.category === cueMask) {
                    //collision of cue with cue ball
                    cueCollisionStrong.play()
                } else {
                    //cue ball to object ball
                    ballCollision.play()
                    let lowestBall = this.balls[0]
                    // console.log(lowestBall)

                    console.log(lowestBall.texture.key)
                    if (bodyA.collisionFilter.category === this.cueBall.body.collisionFilter.category) {
                        if (bodyB.gameObject.texture.key === lowestBall.texture.key && !this.lowestBallHit && this.noBallTouched) {
                            this.lowestBallHit = true
                            console.log('lowest ball hit')
                        }
                    } else if (bodyB.collisionFilter.category === this.cueBall.body.collisionFilter.category) {
                        if (bodyA.gameObject.texture.key === lowestBall.texture.key && !this.lowestBallHit && this.noBallTouched) {
                            this.lowestBallHit = true
                            console.log('lowest ball hit')
                        }
                    }
                    this.noBallTouched = false
                }
            });
        });

        this.graphics = this.add.graphics({lineStyle: {width: 1, color: 0xffffff}});
        this.graphics.alpha = 0.4
        this.hit = false
        this.moveLine = true
        // this.lowestBallHit = false
    }

    foulMade() {
        console.log("foul!!!")
        this.foul.play()
        this.cueBall.setVelocity(0, 0)
        this.cueBall.setToSleep().setInteractive().setVisible(false)
        this.cue.setToSleep()
        this.cueBall.setCollidesWith([])
        if (this.reset9Ball) {
            this.createBall(1040, 350, 'ball_9')
            let ball9 = this.matter.add.sprite(660, 40, 'ball_9')
            ball9.displayHeight = 40
            ball9.displayWidth = 40
            ball9.setBody({
                type: 'circle',
                radius: 20
            });
            ball9.setStatic(true)
            this.ballRack['ball_9'] = ball9
            this.reset9Ball = false
        }
    }

    gameOver() {
        this.cueBall.destroy()
        this.cue.destroy()
        this.board = this.add.image(0, 0, 'gameOver');
        this.board.setOrigin(0, 0)
        this.board.displayWidth = this.sys.canvas.width
        this.board.displayHeight = this.sys.canvas.height
        this.gameOverSound.play()
        console.log("Game over, player wins")
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
        console.log(this.breakShot)
        if (this.breakShot) {
            if (ballPosition.x >= 370) {
                console.log('position reset')
                this.cueBall.setPosition(370, ballPosition.y)
            }
        }
        this.graphics.clear()
        this.line = new Phaser.Geom.Line(ballPosition.x, ballPosition.y, ballPosition.x + 1200, ballPosition.y)
        this.graphics.strokeLineShape(this.line)
        this.moveLine = true
        this.matter.body.setPosition(this.cue.body, this.matter.vector.create(ballPosition.x - 410, ballPosition.y))
    }

    f(x) {
        return 50 / Math.pow(3, x) + 25
    }

    update() {
        if (this.cueBall.body === undefined || this.cue.body === undefined) return
        let ballPosition = this.cueBall.body.position
        let moveCue = false

        this.circles = []

        this.balls.forEach(ball => {
            if (Math.abs(ball.body.velocity.x) > 1e-2 || Math.abs(ball.body.velocity.y) > 1e-2) {
                //the cue moves as long as any ball is moving, ideally should be comparing to 0, but that takes too long
                moveCue = true
            }
        })

        let cuePosition = this.cue.body.position
        let velocityVector = new Phaser.Math.Vector2(ballPosition.x - cuePosition.x, ballPosition.y - cuePosition.y)
        let angle = velocityVector.angle() + Math.PI / 2

        if (moveCue) {
            this.moveLine = true
            if (this.noBallTouchedRest) {
                this.noBallTouched = true
                this.cushionTouchedAfterHittingBall = false
                this.noBallTouchedRest = false
                this.lowestBallHit = false
            }
            this.graphics.clear()
            this.cue.setCollidesWith([])
            this.cue.setVisible(false)
            this.cue.setToSleep()
            this.matter.body.setPosition(this.cue.body, this.matter.vector.create(ballPosition.x - 410, ballPosition.y))
            this.breakShot = false
            this.playerSwitched = false
        } else {
            // this.lowestBallHit = false
            this.turn.text = `PLAYER ${this.currentPlayer}'s turn`
            this.cue.setCollidesWith([this.cueBallCategory])
            if (!this.playerSwitched) {
                console.log("Player Switched", this.correctBallPotted)
                this.currentPlayer ^= 3
            }
            if (this.noBallTouched || !this.cushionTouchedAfterHittingBall || !this.lowestBallHit) {
                this.foulMade()
                this.noBallTouched = false
                this.cushionTouchedAfterHittingBall = true
                this.lowestBallHit = true
            } else if (this.ballPotted && !this.playerSwitched) {
                this.currentPlayer ^= 3
            }
            this.playerSwitched = true

            if (!this.breakShot) {
                this.gameStarted = false
            }
            this.cue.setAwake()
            if (!this.cueBall.visible) {
                this.cueBall.setPosition(342, 350)
                ballPosition = this.cueBall.body.position
                this.matter.body.setPosition(this.cue.body, this.matter.vector.create(this.cueBall.body.position.x - 410, this.cueBall.body.position.y))
                this.cueBall.setVisible(true).setAwake()
            }
            this.balls.forEach(ball => {
                if (ball.body.position !== ballPosition) {
                    let circle = new Phaser.Geom.Circle(ball.body.position.x, ball.body.position.y, 22.5)
                    this.circles.push(circle)
                }
            })

            if (this.moveLine) {
                ballPosition = this.cueBall.body.position
                console.log(ballPosition.x, ballPosition.y)
                this.line = new Phaser.Geom.Line(ballPosition.x, ballPosition.y, ballPosition.x + 1200, ballPosition.y)

                this.helperLines = []
                this.helperLines.push(this.line)
                for (let i = 0; i < 25; i++) {
                    let helperLineUp = new Phaser.Geom.Line(ballPosition.x, ballPosition.y - 22.5 + .9 * i, ballPosition.x + 1200, ballPosition.y - 22.5 + .9 * i)
                    let helperLineDown = new Phaser.Geom.Line(ballPosition.x, ballPosition.y + .9 * (i + 1), ballPosition.x + 1200, ballPosition.y + .9 * (i + 1))
                    this.helperLines.push(helperLineUp, helperLineDown)
                }
                // console.log(this.helperLines)
                this.graphics.strokeLineShape(this.line)
                this.moveLine = false
            }
            this.cue.setVisible(true)
            this.cue.setRotation(angle)
        }

        if (this.cursors.left.isDown) {
            if (!moveCue) {
                this.graphics.clear()
                this.helperLines.forEach(helpLine => {
                    Phaser.Geom.Line.RotateAroundXY(helpLine, ballPosition.x, ballPosition.y, -Math.PI / 270)
                })
                this.graphics.strokeLineShape(this.line)
            }
            this.matter.body.rotate(this.cue.body, -Math.PI / 270, this.matter.vector.create(ballPosition.x, ballPosition.y))
        } else if (this.cursors.right.isDown) {
            if (!moveCue) {
                this.graphics.clear()
                this.helperLines.forEach(helpLine => {
                    Phaser.Geom.Line.RotateAroundXY(helpLine, ballPosition.x, ballPosition.y, Math.PI / 270)
                })
                this.graphics.strokeLineShape(this.line)
            }
            this.matter.body.rotate(this.cue.body, Math.PI / 270, this.matter.vector.create(ballPosition.x, ballPosition.y))
        }

        //Finding point of contact:
        let minDist = 1e9
        let pt
        let circleCentre = []

        this.circles.forEach(circle => {
            this.helperLines.forEach(helpLine => {
                let points = Phaser.Geom.Intersects.GetLineToCircle(helpLine, circle)
                if (points.length) {
                    if (Math.pow(points[0].x - ballPosition.x, 2) + Math.pow(points[0].y - ballPosition.y, 2) < minDist) {
                        minDist = Math.pow(points[0].x - ballPosition.x, 2) + Math.pow(points[0].y - ballPosition.y, 2)
                        pt = points[0]
                        circleCentre = [circle.x, circle.y]
                    }
                }
            })
        })

        if (pt !== undefined) {
            this.graphics.clear()
            this.graphics.fillPoint(pt.x, pt.y, 3)

            let centreLine = new Phaser.Geom.Line(pt.x, pt.y, circleCentre[0], circleCentre[1])
            Phaser.Geom.Line.Extend(centreLine, -22.5, 50)
            let angle = Phaser.Geom.Line.Angle(centreLine)
            let centre = [pt.x - 15 * Math.cos(angle), pt.y - 15 * Math.sin(angle)]

            this.line.x2 = centre[0]
            this.line.y2 = centre[1]
            this.guideCircle = new Phaser.Geom.Circle(centre[0], centre[1], 15)

            this.graphics.strokeLineShape(this.line)
            this.graphics.strokeLineShape(centreLine)
            this.graphics.strokeCircle(this.guideCircle.x, this.guideCircle.y, this.guideCircle.radius)
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
                this.noBallTouchedRest = true
                this.ballPotted = false
            }
        }
    }
}