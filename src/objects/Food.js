import Phaser from 'phaser'

import { BODY_UNIT } from '../Const';

// Blue
var color = Phaser.Display.Color.GetColor(0, 0, 255);


export default class Food {

    // Food should have a spawn boundary? randomly generated 
    constructor(scene, positionX, positionY) {
        this.scene = scene
        
        this.food = this.scene.add.circle(positionX * BODY_UNIT, positionY * BODY_UNIT, BODY_UNIT/2, color).setOrigin(0, 0)
        this.x = this.food.x
        this.y = this.food.y
    }

    destroy() {
        this.food.destroy()
    }




}