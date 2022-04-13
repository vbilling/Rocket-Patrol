

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
        this.load.spritesheet('cat03', './assets/cat03.png', {frameWidth: 96, frameHeight: 96, startFrame: 1, endFrame: 1});
        this.load.spritesheet('cat02', './assets/cat02.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 1});
        this.load.spritesheet('full_strawberry', './assets/full_strawberry.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 1});
    }
    create() {
        //background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'strawberry_field').setOrigin(0, 0);

        //document.body.style.backgroundColor = "pink";
        document.body.style.backgroundImage = "url(./assets/half_strawberry.png)";
        // menu text configuaration
        let menuConfig = {
            fontFamily: 'Arial Black', //Palatino
            fontSize: '20px',
            color: 'white',
            align: 'right',
            stroke: 'black',
            strokeThickness: 3.5,
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

        let warningConfig = {
          fontFamily: 'American Typewriter',
          fontSize: '12px',
          color: 'red',
          align: 'right',
          stroke: 'white',
          strokeThickness: 2,
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0

        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'Strawberry Kitty Munch', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.68, 'Use arrows to move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.52, 'Press (F) to fling strawberries at hungry kitties', menuConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, game.config.height/1.45 + borderUISize + borderPadding, 'Press ⇠ for Novice or ⇢ for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.2 + borderUISize + borderPadding, '*Warning: These actions are performed by trained professionals. Do not try this at home', warningConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        //adding strawberry and cat
        this.Strawberry = this.add.sprite(285, 150, 'full_strawberry').setOrigin(0);
        this.Strawberry.setDisplaySize(70, 70);
        this.cat03 = this.add.sprite(370, 95, 'cat03').setOrigin(0);
        this.cat03.setDisplaySize(170,170);
        this.cat02 = this.add.sprite(100, 95, 'cat02').setOrigin(0);
        this.cat02.setDisplaySize(170, 170);

        this.anims.create({
          key: 'title_munch1',
          frames: this.anims.generateFrameNumbers('cat02', {start: 0, end: 1, first: 0}),
          frameRate: 2,
          repeat: -1
        });
        this.cat02.anims.play('title_munch1');
        
        this.anims.create({
          key: 'title_munch2',
          frames: this.anims.generateFrameNumbers('cat03', {start: 1, end: 0, first: 0}),
          frameRate: 2,
          repeat: -1
        });
        this.cat03.anims.play('title_munch2');
        
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