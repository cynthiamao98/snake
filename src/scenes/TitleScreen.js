import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene
{
    preload() {}


    create() {
        this.text = this.add.text(400, 250, "Hello World!")
        this.text.setOrigin(0.5, 0.5)
    }



}