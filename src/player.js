
class Player {
  constructor(game) {
    this.game = game;
    
    var player = window.player = this.sprite = game.add.sprite(16, game.world.height - 150, 'mario');
    game.physics.arcade.enable(player);
    game.camera.follow(player);

    //player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    player.body.linearDamping = 1;
    player.body.collideWorldBounds = false;

    player.body.maxVelocity.x = 100;

    player.animations.add('1', [8, 9, 10], 7, true);
    player.animations.add('1-rest', [7], 1, false);
    player.animations.add('1-skid', [2], 1, false);
    player.animations.add('1-jump', [12], 1, false);
    player.animations.add('-1', [5, 4, 3], 7, true);
    player.animations.add('-1-rest', [6], 1, false);
    player.animations.add('-1-skid', [11], 1, false);
    player.animations.add('-1-jump', [1], 1, false);

    player.direction = 1;
  }
  update(cursors) {
    var player = this.sprite;
    
    var acceleration = 100,
        jumpForce = 300;

    player.body.acceleration.x = 0;

    //var heading = cursors.left.isDown ? 'left' : cursors.right.isDown ? 'right' : 'rest',
    //    momentum = player.body.velocity.x < 0 ? 'left' : player.body.velocity.x > 0 ? 'right' : 'rest';
    
    var blocked = player.body.blocked;
    
    if (cursors.left.isDown) {
      player.body.acceleration.x = -acceleration;
    } else if (cursors.right.isDown) {
      player.body.acceleration.x = acceleration;
    }

    var direction = Math.sign(player.body.velocity.x);
    var accelerationDirection = Math.sign(player.body.acceleration.x);
    var verticalDirection = Math.sign(player.body.velocity.y);

    if (cursors.up.isDown && player.body.blocked.down) {
      player.body.velocity.y = -jumpForce;
    }

    var movingHorizontally = player.body.velocity.x !== 0,
        movingVertically = player.body.velocity.y !== 0,
        acceleratingHorizontally = player.body.acceleration.x !== 0,
        acceleratingVertically = player.body.acceleration.y !== 0;

    // animations
    if (!movingVertically && blocked.down) {
      player.body.drag.x = 80;
      if (movingHorizontally) {
        if (direction === -accelerationDirection) {
          skid(player, direction);
        } else {
          walk(player, direction);
        }
      } else {
        rest(player, direction);
      }
    } else if (movingVertically) {
      jump(player, direction);
    } else if (!movingVertically && !movingHorizontally) {
      rest(player, direction);
    } else {
      die(player, direction);
    }

  }
}

function walk(player, direction) {
  player.animations.play(direction);
}

function skid(player, direction) {
  player.animations.play(direction + '-skid');
}

function jump(player, direction) {
  player.animations.play(direction + '-jump');
}

function rest(player, direction) {
  player.animations.stop();
  player.animations.play(direction + '-rest');
}

function die(player, direction) {
  player.frame = 0;
}


export default {
  create() {
    return new Player(...arguments);
  }
}