
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load.image(a string w/ key name of graphic, URL for where graphic is located)
        // load images/tile sprites 
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
    }
    create() {
        //place tile sprite - add.tileSprite(x, y, width, height, key string for image)
        //defines is at "this.starfield" because we need the scope to be anywhere in the scene not just the method it is defined in
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // parameters for rectangle(x, y, width, height, color)
        // ("this" refers to the scene object)
        // green UI background 
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        //white boarders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // define keys (attaching these keys to the variables we defined in main.js)
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    // code that is executed every frame of the game
    update() { 
        this.starfield.tilePositionX -= 4;
        //tells Phaser to run our custom update method we wrote in Rocket.js when it runs its own update method
        this.p1Rocket.update();
    }
}