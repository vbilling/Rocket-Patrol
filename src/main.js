
// POINT BREAK DOWN
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
// Create a new animated sprite for the Spaceship enemies (10)
// Create 4 new explosion SFX and randomize which one plays on impact (10)
// Allow the player to control the Rocket after it's fired (5)
// Implement the speed increase that happens after 30 seconds in the original game (5)
// Add your own (copyright-free) background music to the Play scene (5)
// Implement the 'FIRE' UI text from the original game (5)



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




