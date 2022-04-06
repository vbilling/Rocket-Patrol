
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    //an array with the object names of any Phaser scenes we've created
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes (these variables are global since in main.js)
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;




