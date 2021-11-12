import {ballCords} from '../constants/ball8pool.js'
import GameState from '../constants/GameState.js'

export default class Scene_8BallPoolMulti extends Phaser.Scene {
    constructor() {
        super('game')
        this.server = null
        this.gameStateText = null
        console.log('scene started')
    }

    preload() {
        this.scale.scaleMode = Phaser.Scale.CENTER_BOTH;
        this.load.image('board', 'assets/table.png')
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

    init() {
        this.cells = []
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
        ball.setFriction(0.1, 0.01, 0.1);
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
        for (let i = 0; i < 16; i++) {
            this.createBall(ballCords[i][0], ballCords[i][1], `ball_${i + 1}`)
        }
        // this.createBall(950, 350, 'ball_1')
        // this.createBall(1000, 320, 'ball_2')
        // this.createBall(1050, 290, 'ball_3')
        // this.createBall(1100, 260, 'ball_4')
        // this.createBall(1150, 230, 'ball_12')
        // this.createBall(1000, 380, 'ball_9')
        // this.createBall(1050, 410, 'ball_10')
        // this.createBall(1100, 440, 'ball_11')
        // this.createBall(1150, 470, 'ball_5')
        // this.createBall(1052, 350, 'ball_8')
        // this.createBall(1102, 320, 'ball_14')
        // this.createBall(1152, 290, 'ball_6')
        // this.createBall(1102, 380, 'ball_7')
        // this.createBall(1152, 410, 'ball_13')
        // this.createBall(1152, 350, 'ball_15')
        // this.createBall(342, 350, 'ball_16')
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
        cushion.setFrictionStatic(0.5)
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

    //data: IGameSceneData
    async create(data) {
        const {server, onGameOver} = data

        this.server = server
        this.onGameOver = onGameOver

        if (!this.server) {
            throw new Error('server instance missing')
        }

        await this.server.join()

        this.server.onceStateChanged(this.createBoard, this)
    }

    //call when needed to set the state: 
    //1/ if(this.server !== null) this.server.setStateData()  
    //2/ if(this.server !== null) this.server.onBoardChanged(this.handleBoardChanged, this)

    createBoard(state) {
        console.log(state)
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

        this.balls = []
        this.potted = {
            'ball_1': false,
            'ball_2': false,
            'ball_3': false,
            'ball_4': false,
            'ball_5': false,
            'ball_6': false,
            'ball_7': false,
            'ball_8': false,
            'ball_9': false,
            'ball_10': false,
            'ball_11': false,
            'ball_12': false,
            'ball_13': false,
            'ball_14': false,
            'ball_15': false,
            'ball_16': false
        }
        this.createBalls()

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
        let potCategory = pot1.body.collisionFilter.category

        this.composite = this.matter.composite.create()
        this.cue = this.matter.add.sprite(250, 370, 'cue')
        this.cue.setBody({
            type: 'trapezoid',
            slope: 0.5
        })
        this.cue.setBounce(1)
        // this.cue.setMass(10)
        this.cue.setFrictionAir(0.5)
        this.cue.setRotation(Math.PI / 2)
        this.cue.setCollisionCategory(this.cueCategory)
        this.cue.setCollidesWith([this.cueBallCategory])
        this.cue.setFixedRotation()
        this.matter.composite.add(this.composite, this.cue.body)
        let cueMask = this.cue.body.collisionFilter.category

        let categories = [this.ballCategory, this.cueBallCategory, this.cushionCategory, this.potCategory]
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

        this.cueSpeed = 0

        this.input.on('pointerdown', this.startDrag, this)

        this.noBallTouched = false
        this.noBallTouchedRest = true
        this.cushionTouchedAfterHittingBall = true

        this.matter.world.on("collisionstart", (event) => {
            event.pairs.forEach((pair) => {
                const {bodyA, bodyB} = pair;
                // console.log(bodyA.collisionFilter.category)
                // console.log(bodyB.collisionFilter.category)
                if (bodyA.collisionFilter.category === potCategory) {
                    if (bodyB.collisionFilter.category !== this.cueBall.body.collisionFilter.category) {
                        let ball = bodyB.gameObject
                        console.log(bodyB.gameObject)
                        bodyB.gameObject.destroy()
                        pocket.play()
                        this.cushionTouchedAfterHittingBall = true
                        let index = this.balls.indexOf(ball);
                        if (index !== -1) {
                            this.balls.splice(index, 1);
                        }
                        this.potted[ball.texture.key] = true
                    } else {
                        this.foulMade()
                    }
                } else if (bodyB.collisionFilter.category === potCategory) {
                    if (bodyA.collisionFilter.category !== this.cueBall.body.collisionFilter.category) {
                        let ball = bodyA.gameObject
                        console.log(bodyA.gameObject)
                        bodyA.gameObject.destroy()
                        pocket.play()
                        this.cushionTouchedAfterHittingBall = true
                        let index = this.balls.indexOf(ball);
                        if (index !== -1) {
                            this.balls.splice(index, 1);
                            this.input.on('pointerDown', this.startDrag, this)
                        }
                        this.potted[ball.texture.key] = true
                    } else {
                        this.foulMade()
                    }
                } else if (bodyA.collisionFilter.category === cushion1.body.collisionFilter.category || bodyB.collisionFilter.category === cushion1.body.collisionFilter.category) {
                    if (bodyA.collisionFilter.category == cushion1.body.collisionFilter.category) {
                        if (bodyB.collisionFilter.category !== this.cueBall.body.collisionFilter.category && !this.noBallTouched) {
                            this.cushionTouchedAfterHittingBall = true
                        }
                    } else {
                        if (bodyA.collisionFilter.category !== this.cueBall.body.collisionFilter.category && !this.noBallTouched) {
                            this.cushionTouchedAfterHittingBall = true
                        }
                    }
                    cushionCollision.play()
                } else if (bodyA.collisionFilter.category === cueMask || bodyB.collisionFilter.category === cueMask) {
                    cueCollisionStrong.play()
                } else {
                    ballCollision.play()
                    this.noBallTouched = false
                }
            });
        });

        this.graphics = this.add.graphics({lineStyle: {width: 1, color: 0xffffff}});
        this.graphics.alpha = 0.4
        this.hit = false
        this.moveLine = true
        this.cuePositionReset = false
        this.cnt = 0
        this.prv = 0

        if (this.server !== null && this.server.gameState === GameState.WaitingForPlayers) {
            const width = this.scale.width
            this.gameStateText = this.add.text(width * 0.5, 50, 'Waiting for opponent...')
                .setOrigin(0.5)
        }
        if (this.server !== null) this.server.onBoardChanged(this.handleBoardChanged, this)
        if (this.server !== null) this.server.onPlayerTurnChanged(this.handlePlayerTurnChanged, this)
        if (this.server !== null) this.server.onCuePositionChanged(this.handleCuePositionChanged, this)
        //this.server?.onPlayerWon(this.handlePlayerWon, this)
        //this.server?.onGameStateChanged(this.handleGameStateChanged, this)
    }

    foulMade() {
        console.log("foul!!!")
        this.foul.play()
        this.cueBall.setVelocity(0, 0)
        this.cueBall.setToSleep().setInteractive().setVisible(false)
        this.cue.setToSleep()
        this.cueBall.setCollidesWith([])
        this.noBallTouched = false
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
        this.cue.setVisible(true)
        this.line = new Phaser.Geom.Line(ballPosition.x, ballPosition.y, ballPosition.x + 1200, ballPosition.y)
        this.graphics.strokeLineShape(this.line)
        this.moveLine = true
        this.matter.body.setPosition(this.cue.body, this.matter.vector.create(ballPosition.x - 410, ballPosition.y))
    }

    f(x) {
        return 50 / Math.pow(3, x) + 25
    }


    async update() {
        if (this.server === null || !this.server.isCurrentPlayerTurn()) {
            return
        }
        // console.log("this player's turn")

        let ballPosition = this.cueBall.body.position
        let moveCue = false

        let pointer = this.input.activePointer;
        this.circles = []

        this.balls.forEach(ball => {
            if (Math.abs(ball.body.velocity.x) > 1e-2 || Math.abs(ball.body.velocity.y) > 1e-2) {
                moveCue = true
            }
        })

        let cuePosition = this.cue.body.position
        let velocityVector = new Phaser.Math.Vector2(ballPosition.x - cuePosition.x, ballPosition.y - cuePosition.y)
        let angle = velocityVector.angle() + Math.PI / 2

        let newData = {
            hitSpeed: 0,
            cueAngle: 0,
            delAngle: angle,
            duration: 0,
            x: 0,
            y: 0
        }

        if (moveCue) {
            this.moveLine = true
            if (this.noBallTouchedRest) {
                this.noBallTouched = true
                this.cushionTouchedAfterHittingBall = false
                this.noBallTouchedRest = false
            }
            this.graphics.clear()
            this.cue.setVisible(false)
            this.cue.setCollidesWith([])
            this.matter.body.setPosition(this.cue.body, this.matter.vector.create(ballPosition.x - 410, ballPosition.y))
            this.cuePositionReset = true
            if (this.server !== null) {
                this.server.setCueStateData([ballPosition.x, ballPosition.y])
                // this.cuePositionReset = false
            }
        } else {
            if (this.noBallTouched || !this.cushionTouchedAfterHittingBall) {
                this.foulMade()
                this.noBallTouched = false
                this.cushionTouchedAfterHittingBall = true
            }
            this.cue.setCollidesWith([this.cueBallCategory])
            if (!this.cueBall.visible) {
                this.cueBall.setPosition(342, 350)
                ballPosition = this.cueBall.body.position
                this.matter.body.setPosition(this.cue.body, this.matter.vector.create(this.cueBall.body.position.x - 410, this.cueBall.body.position.y))
                this.cueBall.setVisible(true).setAwake()
            }
            // newData.x = this.cue.body.position.x
            // newData.y = this.cue.body.position.y
            // if (this.server !== null) this.server.setStateData(newData)

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
                console.log(this.helperLines)
                this.graphics.strokeLineShape(this.line)
                this.moveLine = false
            }
            this.cue.setVisible(true)
            this.cue.setRotation(angle)
            if (this.server !== null && this.cuePositionReset) {
                this.server.setCueStateData([angle, this.cue.body.position.x, this.cue.body.position.y])
                this.cuePositionReset = false
            }
            //if(this.server !== null) this.server.setPlayerTurnData(true)

        }
        if (this.cursors.left.isDown) {
            if (!moveCue) {
                this.graphics.clear()
                this.helperLines.forEach(helpLine => {
                    Phaser.Geom.Line.RotateAroundXY(helpLine, ballPosition.x, ballPosition.y, -Math.PI / 360)
                })
                this.graphics.strokeLineShape(this.line)
            }
            newData.cueAngle -= Math.PI / 360
            this.matter.composite.rotate(this.composite, -Math.PI / 360, this.matter.vector.create(ballPosition.x, ballPosition.y))
            // this.matter.body.rotate(this.cue.body, -Math.PI / 360, this.matter.vector.create(ballPosition.x, ballPosition.y))
            if (this.server !== null) {
                console.log("left pressed")
                this.cnt += 1
                this.server.setCueStateData([-1, ballPosition.x, ballPosition.y, this.cnt])
            }
        } else if (this.cursors.right.isDown) {
            if (!moveCue) {
                this.graphics.clear()
                this.helperLines.forEach(helpLine => {
                    Phaser.Geom.Line.RotateAroundXY(helpLine, ballPosition.x, ballPosition.y, Math.PI / 360)
                })
                this.graphics.strokeLineShape(this.line)
            }
            newData.cueAngle += Math.PI / 360
            this.matter.composite.rotate(this.composite, Math.PI / 360, this.matter.vector.create(ballPosition.x, ballPosition.y))
            // this.matter.body.rotate(this.cue.body, Math.PI / 360, this.matter.vector.create(ballPosition.x, ballPosition.y))
            if (this.server !== null) {
                this.cnt += 1
                this.server.setCueStateData([1, ballPosition.x, ballPosition.y, this.cnt])
            }
        }

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
        // console.log(pt)
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
                console.log(this.cue.body.position)
                // console.log("velocity set")
            }
        }
        // console.log(this.hit)
        if (this.cursors.down.isUp && this.hit) {
            this.hit = false
            let duration = this.cursors.down.duration
            duration = Math.min(duration, 2000)
            newData.duration = duration
            if (!moveCue) {
                let speed = ((duration + this.f(duration)) * 1.25) / 600
                speed = Math.min(speed, 4.5)
                console.log("speed = ", speed)
                newData.hitSpeed = speed
                // console.log(duration)
                this.cueBall.setCollidesWith(this.cueBallCollidesWith)
                this.cueBall.disableInteractive()
                newData.x = this.cue.body.position.x
                newData.y = this.cue.body.position.y
                this.cue.setVelocity(0, 0)
                console.log(this.cue.body.position, this.cue.angle)
                this.matter.applyForceFromAngle(this.cue.body, speed, angle - Math.PI / 2)
                if (this.server !== null) this.server.setStateData(newData)
                this.noBallTouchedRest = true
            }
        }
    }

    //newValue: newdata
    async handleBoardChanged(newValue) {
        if (this.server === null || this.server.isCurrentPlayerTurn()) {
            return
        }
        // console.log("not this player's turn")
        console.log(newValue.cueAngle, newValue.delAngle, newValue.hitSpeed, newValue.duration)
        // this.cue.setVisible(true)

        let ballPosition = this.cueBall.body.position
        let cuePosition = this.cue.body.position
        this.cue.setCollidesWith([this.cueBallCategory])
        this.matter.body.setPosition(this.cue.body, this.matter.vector.create(newValue.x, newValue.y))
        console.log(this.cue.body.position, this.cue.angle)
        let velocityVector = new Phaser.Math.Vector2(ballPosition.x - cuePosition.x, ballPosition.y - cuePosition.y)
        this.matter.applyForceFromAngle(this.cue.body, newValue.hitSpeed, velocityVector.angle())
    }

    handleCuePositionChanged(newValue) {
        if (this.server === null || this.server.isCurrentPlayerTurn()) {
            return
        }
        // this.cue.setVisible(false)
        if (newValue.length === 3) {
            this.cue.setRotation(newValue[0])
            this.matter.body.setPosition(this.cue.body, this.matter.vector.create(newValue[1], newValue[2]))
        } else if (newValue.length === 4) {
            // console.log(this.matter.composite.allBodies(this.composite))
            this.graphics.fillPoint(newValue[1], newValue[2], 10)
            console.log("left pressed")
            ++this.prv
            this.matter.composite.rotate(this.composite, newValue[0] * Math.PI / 360, this.matter.vector.create(newValue[1], newValue[2]))
            while (this.prv < newValue[3]) {
                console.log("left pressed")
                ++this.prv
                this.matter.composite.rotate(this.composite, newValue[0] * Math.PI / 360, this.matter.vector.create(newValue[1], newValue[2]))
            }
            // console.log(newValue[1], newValue[2])
            // this.matter.body.rotate(this.cue.body, newValue[0], this.matter.vector.create(newValue[1], newValue[2]))
        } else {
            // console.log(newValue[0], newValue[1])
            this.cue.setCollidesWith([])
        }
    }

    handlePlayerTurnChanged(playerIndex) {
        console.log("player turn changed to " + playerIndex)
    }

    //if(this.server !== null) this.server.setPlayerTurnData(true)
    //if(this.server !== null) this.server.isCurrentPlayerTurn()


    // private handleBoardChanged(newValue: Cell, idx: number)
    // {
    // 	const cell = this.cells[idx]
    // 	if (cell.value !== newValue)
    // 	{
    // 		switch (newValue)
    // 		{
    // 			case Cell.X:
    // 			{
    // 				this.add.star(cell.display.x, cell.display.y, 4, 4, 60, 0xff0000)
    // 					.setAngle(45)
    // 				break
    // 			}

    // 			case Cell.O:
    // 			{
    // 				this.add.circle(cell.display.x, cell.display.y, 50, 0x0000ff)
    // 				break
    // 			}
    // 		}

    // 		cell.value = newValue
    // 	}
    // }


    // private handlePlayerTurnChanged(playerIndex: number)
    // {
    // 	// TODO: show a message letting the player know it is their turn
    // }
    //
    // private handlePlayerWon(playerIndex: number)
    // {
    // 	this.time.delayedCall(1000, () => {
    // 		if (!this.onGameOver)
    // 		{
    // 			return
    // 		}
    //
    // 		this.onGameOver({
    // 			winner: this.server?.playerIndex === playerIndex
    // 		})
    // 	})
    // }
    //
    // private handleGameStateChanged(state: GameState)
    // {
    // 	if (state === GameState.Playing && this.gameStateText)
    // 	{
    // 		this.gameStateText.destroy()
    // 		this.gameStateText = undefined
    // 	}
    // }
}