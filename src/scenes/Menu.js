

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload () {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('poof', './assets/mpoof.wav');
        this.load.audio('magic', './assets/magic.wav');
        this.load.audio('magic_shot', './assets/magic_shot.wav');

        // background
        this.load.image('strawberry_field', './assets/strawberry_field.png');
        //images for decoration
        this.load.spritesheet('half_strawberry', './assets/half_strawberry.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('purple_cat', './assets/purple_cat.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 96});
        this.load.spritesheet('cat02', './assets/cat02.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 96});
        this.load.spritesheet('full_strawberry', './assets/full_strawberry.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 1});
    }
    create() {
        //background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'strawberry_field').setOrigin(0, 0);



        //document.body.style.backgroundColor = "pink";
        document.body.style.backgroundImage = "url(./assets/half_strawberry.png)";
        // menu text configuaration
        let menuConfig = {
            fontFamily: 'Palatino',
            fontSize: '26px',
            color: 'white',
            align: 'right',
            stroke: 'black',
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // text conditions for Strawberry title
        let titleConfig = {
            fontFamily: 'Brush Script MT',
            fontSize: '60px',
            color: '#ff59b8',
            align: 'right',
            stroke: 'white',
            strokeThickness: 6,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'Strawberry Kitty Munch', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.55, 'Use arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, game.config.height/1.55 + borderUISize + borderPadding, 'Press ⇠ for Novice or ⇢ for Expert', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        //adding strawberry and cat
        this.Strawberry = this.add.image(285, 150, 'full_strawberry').setOrigin(0);
        this.Strawberry.setDisplaySize(70, 70);
        this.purpleCat = this.add.image(370, 90, 'purple_cat').setOrigin(0);
        this.purpleCat.setDisplaySize(170,170);
        this.cat02 = this.add.image(100, 100, 'cat02').setOrigin(0);
        this.cat02.setDisplaySize(170, 170);
        
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('magic');
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('magic');
            this.scene.start('playScene');    
          }
    }
}