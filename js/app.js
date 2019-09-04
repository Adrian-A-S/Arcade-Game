// The player resetting modal class.

class Modal {
    constructor(theResetP) {
      this.resetP = theResetP;
      theResetP.addEventListener('click', e => {
        if (e.srcElement.id === this.resetP.id) {
          this.resetP.classList.add('is-hidden');
          player.resetPlayer();
          isWon = false;
        }
      });
    }
}

const resetter = new Modal (document.querySelector('.modal'));

const TILE_X = 101;
const TILE_Y = 83;
let isWon = false; // When true, blocks player action.

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // As per my choice a new enemy starts offscreen, is randomly
    // assigned a stone row to cover and is given a randon speed.
    this.x = -100;
    this.y = (Math.floor((Math.random() * 3) + 1) * TILE_Y) - 15;
    this.speed = Math.floor((Math.random() * 90) + 11);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // When an enemy reaches the end of the row, reset it.
    // This effectively recycles the enemies instead of deleting
    // and creating new enemies all the time.
    if (this.x > 500) {
        this.x = -100;
        this.speed = Math.floor((Math.random() * 90) + 11);
        this.y = (Math.floor((Math.random() * 3) + 1) * TILE_Y) - 15;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    // Player starts in the middle of the bottomn most row.
    this.x = 2 * TILE_X;
    this.y = (5 * TILE_Y) - 15;
};

// handleInput function, which moves the player tile by tile based on
// key pressed and confines them in the game window.

Player.prototype.handleInput = function (theKeyCode) {
    if (!isWon) {
        if (theKeyCode === 'left') {
            if (Math.floor(this.x / TILE_X) !== 0) {
                this.x -= TILE_X;
            }
        } else if (theKeyCode === 'up') {
            if (Math.floor(this.y / TILE_Y) !== -1) {
                this.y -= TILE_Y;
            }
        } else if (theKeyCode === 'right') {
            if (Math.floor(this.x / TILE_X) !== 4) {
                this.x += TILE_X;
            }
        } else if (theKeyCode === 'down') {
            if (Math.floor(this.y / TILE_Y) !== 4) {
                this.y += TILE_Y;
            }
        }
    }
}



// update function which handles the victory condition.

Player.prototype.update = function () {
    if (Math.floor((this.y + 15) / TILE_Y) === 0) {
        isWon = true;
        resetter.resetP.classList.remove('is-hidden');
    }    
}

// render function.

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// resetPlayer function, puts the player pawn back in its starting position.

Player.prototype.resetPlayer = function () {
    this.x = 2 * TILE_X;
    this.y = (5 * TILE_Y) - 15;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// 5 enemies are always present on the board.
let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
