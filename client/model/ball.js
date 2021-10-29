export default class Ball{
    // the sprite created for this ball
    constructor(x, y, key, group){
        this.x = x;
        this.y = y;
        this.key = key;

        // todo: create sprite for the ball
        //       setOrigin(0, 0)
        //       displayHeight = 60
        //       displayWidth = 60

        let ball = this.matter.add.image(x, y, key)

        // var ball = game.add.sprite(x, y, key);
        // game.physics.p2.enable(ball,false);
        // ball.body.setCircle(30/2);
        // ball.body.setCollisionGroup(group);
        // this.sprite = ball;
    }

    isMoving(){
        //console.log(Math.abs(this.sprite.body.velocity.x) + " ,"+ Math.abs(this.sprite.body.velocity.y));
        if (Math.abs(this.sprite.body.velocity.x) > 3 && Math.abs(this.sprite.body.velocity.y) > 3) {
            if(this.sprite.body.velocity.x>1)
                this.sprite.body.velocity.x -= .3;
            if(this.sprite.body.velocity.y>1)
                this.sprite.body.velocity.y -= .3;
            if(this.sprite.body.velocity.x<1)
                this.sprite.body.velocity.x += .3;
            if(this.sprite.body.velocity.y<1)
                this.sprite.body.velocity.y += .3;
            return true;
        }else{
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            return false;
        }
    }
}