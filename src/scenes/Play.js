
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load.image(a string w/ key name of graphic, URL for where graphic is located)
        // load images/tile sprites 
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/strawberry_field.png');

        // load sprite sheet
        this.load.spritesheet('explosion', './assets/explosion01.png', {frameWidth: 128, frameHeight: 64, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion02', './assets/explosion02.png', {frameWidth: 128, frameHeight: 64, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion03', './assets/explosion03.png', {frameWidth: 128, frameHeight: 64, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion04', './assets/explosion04.png', {frameWidth: 128, frameHeight: 64, startFrame: 0, endFrame: 9});
        //sprite sheet for strawberries
        this.load.spritesheet('full_strawberry', './assets/full_strawberry.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('half_strawberry', './assets/half_strawberry.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        //cat
        this.load.spritesheet('cat01', './assets/cat01.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 96});
        this.load.spritesheet('cat02', './assets/cat02.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 96});
        this.load.spritesheet('cat03', './assets/cat03.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 96});

    }
    //happens once when the scene is created
    create() {
        //background music
        var music = this.sound.add('background_music');
        music.setLoop(true);
        music.play();

        //place tile sprite - add.tileSprite(x, y, width, height, key string for image)
        //defines is at "this.starfield" because we need the scope to be anywhere in the scene not just the method it is defined in
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // parameters for rectangle(x, y, width, height, color)
        // ("this" refers to the scene object)
        // green UI background 
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xff59b8).setOrigin(0, 0);
        //white boarders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'full_strawberry').setOrigin(0.5, 0);

        // add spaceships (x3) - binding 3 new Spaceship class instances as properties to our current scene context
        //(last parameter is our custom pointValue)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'cat01', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'cat02', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'cat03', 0, 10).setOrigin(0, 0);

        // define keys (attaching these keys to the variables we defined in main.js)
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config (frames property usually expects an array but generateFrameNumbers does it automatically)
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 12,
        });
        this.anims.create({
            key: 'explode02',
            frames: this.anims.generateFrameNumbers('explosion02', {start: 0, end: 9, first: 0}),
            frameRate: 12,
        });
        this.anims.create({
            key: 'explode03',
            frames: this.anims.generateFrameNumbers('explosion03', {start: 0, end: 9, first: 0}),
            frameRate: 12,
        });
        this.anims.create({
            key: 'explode04',
            frames: this.anims.generateFrameNumbers('explosion04', {start: 0, end: 9, first: 0}),
            frameRate: 12,
        });
        

        // cat munching animation
        this.anims.create({
            key: 'munch1',
            frames: this.anims.generateFrameNumbers('cat01', {start: 0, end: 1, first: 0}),
            frameRate: 2.5,
            repeat: -1
        }); 
        this.ship01.anims.play('munch1');

        this.anims.create({
            key: 'munch2',
            frames: this.anims.generateFrameNumbers('cat02', {start: 0, end: 1, first: 0}),
            frameRate: 2.05,
            repeat: -1
        }); 
        this.ship02.anims.play('munch2');
        
        this.anims.create({
            key: 'munch3',
            frames: this.anims.generateFrameNumbers('cat03', {start: 0, end: 1, first: 0}),
            frameRate: 2.1,
            repeat: -1
        }); 
        this.ship03.anims.play('munch3');

        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Chalkduster',
            fontSize: '26px',
            backgroundColor: 'white',
            color: 'black',
            align: 'center',
            padding: {
                top: 5,
                bottom: 4,
            },
            fixedWidth: 100
        }

        let gameoverConfig = {
            fontFamily: 'Arial Black', //Luminari Regular
            fontSize: '28px',
            backgroundColor: '#ff59b8',
            color: 'white',
            align: 'right',
            stroke: 'black',
            strokeThickness: 5,
            padding: {
                top: 5,
                bottom: 5,
            },
            
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*1.7, this.p1Score, scoreConfig);
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

        // GAME OVER flag
        this.gameOver = false;
        // 60 second play clock 
        // time.delayedCall(the time that will elapse before the callback function fires, the callback function itself, any arguments we want to pass to the callback(null), the callback context ("this" is the Play scene))
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2.4, 'GAME OVER', gameoverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 30, 'Press (R) to Restart or ← for Menu', gameoverConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }
    // code that is executed every frame of the game
    update() { 
        //this.ship01.anims.play('munch');
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        //tells Phaser to run our custom update method we wrote in Rocket.js when it runs its own update method
        this.p1Rocket.update();

        //idk what im doing
        //this.ship01.anims.play('munch');

        // update spaceships
        if (!this.gameOver) {
            this.p1Rocket.update(); // update rocket sprite
            this.ship01.update(); // update spaceships
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

    }
    checkCollision(rocket, ship) {
        // simple AABB checking - returns true if two rectagles overlap and false if they do not
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        // getting a random explosion
        function random(mn, mx) {
            return Math.round(Math.random() * (mx - mn) + mn);
        };
        //creating an array of the explosion names so I can randomly pick one later
        var explosion_array = ['explode', 'explode02', 'explode03', 'explode04'];
        var pick_explosion = random(0, 3);
        boom.anims.play(explosion_array[pick_explosion]); // play explode animation
        boom.on('animationcomplete', () => { // callback after anim completes
            ship.reset(); // reset ship position
            ship.alpha = 1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        //sound.play() is great for one off sounds
        this.sound.play('poof');
    }
}