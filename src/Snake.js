import Phaser from 'phaser'

var DEFAULT_TIME_BETWEEN_MOVES = 200

var singleBodySize = 16

//  Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

export default class Snake {
    
    constructor(scene, positionX, positionY) {
       this.scene = scene
       this.bodyGroup = scene.add.group();
       
       // Custom settings that can be added to the constructor later to support multiplayer.
       this.speed = 1
       this.timeBetweenEachMove = DEFAULT_TIME_BETWEEN_MOVES / this.speed
       this.color = Phaser.Display.Color.GetColor(255, 255, 255);

       this.headPosition = new Phaser.Geom.Point(positionX, positionY)
       this.head = this.createSingleBodyPart(positionX, positionY, this.color)
       
       // Custom property

       this.moveTime = 0


       this.heading = RIGHT;
       this.direction = RIGHT;

       this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    faceLeft() {
        if (this.direction === UP || this.direction === DOWN ) {
            this.heading = LEFT
        }
    }

    faceRight() {
        if (this.direction === UP || this.direction === DOWN ) {
            this.heading = RIGHT
        }
    }

    faceUp() {
        if (this.direction === LEFT || this.direction === RIGHT ) {
            this.heading = UP
        }
    }

    faceDown() {
        if (this.direction === LEFT || this.direction === RIGHT ) {
            this.heading = DOWN
        }
    }

    move(time) {
        /**
        * Based on the heading property (which is the direction the pgroup pressed)
        * we update the headPosition value accordingly.
        * 
        * The Math.wrap call allow the snake to wrap around the screen, so when
        * it goes off any of the sides it re-appears on the other.
        */
        switch (this.heading)
        {
            case LEFT:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
                break;

            case RIGHT:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
                break;

            case UP:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
                break;

            case DOWN:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
                break;
        }

        this.direction = this.heading;

        //  Update the body segments
        Phaser.Actions.ShiftPosition(this.bodyGroup.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1);

        //  Update the timer ready for the next movement
        this.moveTime = time + this.timeBetweenEachMove;

        return true;
    }

    update(time, delta) {
        const cursors = this.cursors
        if (cursors.left.isDown)
        {
            this.faceLeft();
        }
        else if (cursors.right.isDown)
        {
            this.faceRight();
        }
        else if (cursors.up.isDown)
        {
            this.faceUp();
        }
        else if (cursors.down.isDown)
        {
            this.faceDown();
        }

        if (time >= this.moveTime) {
            this.move(time)
        }
    }


    createSingleBodyPart(positionX, positionY, color) {
        const body = this.scene.add.rectangle(positionX * singleBodySize, positionY * singleBodySize, singleBodySize, singleBodySize, color)
        this.bodyGroup.add(body)

        return body
    }

    





}