// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed; //pixels per frame
        this.speedTimer = game.settings.gameTimer;
  
    }

    update() {
        //reduce the clock
        this.speedTimer -= 10;
        if (this.speedTimer == 30000) {
            this.moveSpeed += 2;
        }
        
        // move spaceship left
        this.x -= this.moveSpeed;
    
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }

        //animation
        //this.ship01.anims.play('munch');

    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}

