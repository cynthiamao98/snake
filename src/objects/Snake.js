import Phaser from 'phaser'

import { DEFAULT_TIME_BETWEEN_MOVES, BODY_UNIT } from '../Const';

//  Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

export default class Snake {
    
    constructor(scene, positionX, positionY, gameHeight, gameWidth) {
       this.scene = scene
       this.gameHeight = gameHeight
       this.gameWidth = gameWidth
       // Group that contains the snake's body parts.
       this.bodyGroup = scene.add.group();
       
       // Custom settings that can be added to the constructor later to support multiplayer.
       this.speed = 1
       this.timeBetweenEachMove = DEFAULT_TIME_BETWEEN_MOVES / this.speed
       this.color = Phaser.Display.Color.GetColor(255, 255, 255);

       this.headPosition = new Phaser.Geom.Point(positionX, positionY)
       this.head = this.scene.add.rectangle(positionX * BODY_UNIT, positionY * BODY_UNIT, BODY_UNIT, BODY_UNIT, this.color).setOrigin(0, 0)
       this.bodyGroup.add(this.head)
       this.tailPositionActual = new Phaser.Geom.Point(positionX * BODY_UNIT, positionY * BODY_UNIT)
       
       // The snake will only move when the current time >= move time.
       this.moveTime = 0
       // Affects the next step that the snake will take when {@code move} is called again.
       this.heading = RIGHT
       // Indicates the current direction that the snake is facing.
       this.direction = RIGHT

       this.isAlive = true
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

    /** Called when current time >= moveTime. This moves the snake to a new location. */
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
                this.headPosition.x = this.headPosition.x - 1;
                break;

            case RIGHT:
                this.headPosition.x = this.headPosition.x + 1;
                break;

            case UP:
                this.headPosition.y = this.headPosition.y - 1;
                break;

            case DOWN:
                this.headPosition.y = this.headPosition.y + 1;
                break;
        }

        this.direction = this.heading;

        var newHeadPositonActual = new Phaser.Geom.Point(this.headPosition.x * BODY_UNIT, this.headPosition.y * BODY_UNIT)

        // Understand if the snake is dead or not depending on whether it touched the boundaries
        if (newHeadPositonActual.x < 0 || newHeadPositonActual.y < 0 || newHeadPositonActual.x >= this.gameWidth || newHeadPositonActual.y >= this.gameHeight) {
            this.isAlive = false
            return false;
        }

        // TODO - Snake should die if it collides with its own body

        // Update the body segments
        Phaser.Actions.ShiftPosition(this.bodyGroup.getChildren(), newHeadPositonActual.x, newHeadPositonActual.y, 1, this.tailPositionActual);

        //  Update the timer ready for the next movement
        this.moveTime = time + this.timeBetweenEachMove;

        return true;
    }

    /** Grows the snake by one body part at the tail. */
    grow() {
        var newTail = this.scene.add.rectangle(this.tailPositionActual.x, this.tailPositionActual.y, BODY_UNIT, BODY_UNIT, this.color).setOrigin(0, 0)
        this.bodyGroup.add(newTail)
    }

    /** Called whenever the scene gets updated. */
    update(time) {
        if (time >= this.moveTime) {
            return this.move(time)
        }
        return false
    }

    maybeEatFood(food) {
        if (this.head.x === food.x && this.head.y === food.y) {
            food.destroy()
            this.grow()
            return true
        }
        return false
    }

    getLength() {
        return this.bodyGroup.getLength()
    }


}