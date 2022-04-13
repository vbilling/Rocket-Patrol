// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add objects to existing scene and also to the Phaser displayList and updateList ("this" is the Rocket object)
        scene.add.existing(this);
        this.isFiring = false; // track rocket's firing status
        this.moveSpeed = 2; // pixels per frame

        // add rocket sfx
        this.sfxRocket = scene.sound.add('magic_shot');
        let fireConfig = {
            fontFamily: 'American Typewriter',
            fontSize: '26px',
            color: 'white', //#ffb5f9
            align: 'center',
            padding: {
                top: 5,
                bottom: 4,
                right: 10,
            },

        }
        this.fire_text = scene.add.text(160, 55, 'FLING!', fireConfig).setOrigin(0);
        this.fire_text.setAlpha(0);
    }


    update() {
        //alpha of fire text

        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.fire_text.setAlpha(0);
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.fire_text.setAlpha(1);
                this.x += this.moveSpeed;
            }
        }
        else if(this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.fire_text.setAlpha(1);
            this.isFiring = true;
            this.sfxRocket.play();
        }
        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.fire_text.setAlpha(0);
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}