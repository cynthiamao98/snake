import Phaser from "phaser"

import Snake from "../objects/Snake"
import Food from "../objects/Food"
import { BODY_UNIT } from "../Const"

export default class Game extends Phaser.Scene 
{

    preload() {
    }

    create() {

        this.gameSize = this.sys.game.scale.gameSize
        
        this.text = this.add.text(this.gameSize.width / 2, Phaser.Math.FloorTo(this.gameSize.height / 2), "")
        this.text.setOrigin(0.5, 0.5)
        // Keyboard input.
        this.cursors = this.input.keyboard.createCursorKeys();

        this.snake = new Snake(this, 8, 8, this.gameSize.height, this.gameSize.width);

        // get the scene's boundary
        this.food = this.generateRandomFood()
        
    }


    update(time, delta) {
        if (!this.snake.isAlive) {
            this.text.setText("Game over. Final length: " + this.snake.getLength())
            // TODO - Display a button to restart the game.
            return;
        }



        const cursors = this.cursors
        if (cursors.left.isDown)
        {
            this.snake.faceLeft();
        }
        else if (cursors.right.isDown)
        {
            this.snake.faceRight();
        }
        else if (cursors.up.isDown)
        {
            this.snake.faceUp();
        }
        else if (cursors.down.isDown)
        {
            this.snake.faceDown();
        }

        if (this.snake.update(time)) {
            if (this.snake.maybeEatFood(this.food)) {
                this.food = this.generateRandomFood()
            }
        }
    }

    generateRandomFood() {
        return new Food(this, Phaser.Math.Between(0, Phaser.Math.FloorTo(this.gameSize.width / BODY_UNIT) - 1), Phaser.Math.Between(0, Phaser.Math.FloorTo(this.gameSize.height / BODY_UNIT) - 1))
    }
    
}