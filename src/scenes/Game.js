import Phaser from "phaser"

export default class Game extends Phaser.Scene 
{

    preload() {



    }

    create() {
        const text = this.add.text(400, 250, "Game!")
        text.setOrigin(0.5, 0.5)
    }
    
}