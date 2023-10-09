import Phaser from "phaser"

import Snake from "../Snake"

export default class Game extends Phaser.Scene 
{

    preload() {
        this.load.image('body', 'assets/body.png')

    }

    create() {
        this.text = this.add.text(400, 250, "Start Game!")
        this.text.setOrigin(0.5, 0.5)

        // this.add.rectangle(8 * 16, 8 * 16, 16, 16, Phaser.Display.Color.GetColor(255, 255, 255))

        this.snake = new Snake(this, 8, 8);
        
    }


    update(time, delta) {
        this.text.setText("Time: " + time)
        
        this.snake.update(time) 
    }
        
    
}