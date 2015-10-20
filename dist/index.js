(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var game = new Phaser.Game(360, 240, Phaser.AUTO, '');

exports['default'] = game;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _stateMenu = require('./state-menu');

var _stateMenu2 = _interopRequireDefault(_stateMenu);

var _statePlay = require('./state-play');

var _statePlay2 = _interopRequireDefault(_statePlay);

var _statePreload = require('./state-preload');

var _statePreload2 = _interopRequireDefault(_statePreload);

window.game = _game2['default'];

_game2['default'].state.add('menu', _stateMenu2['default']);
_game2['default'].state.add('preload', _statePreload2['default']);
_game2['default'].state.add('play', _statePlay2['default']);

_game2['default'].state.start('preload');

},{"./game":1,"./state-menu":4,"./state-play":5,"./state-preload":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _bind = Function.prototype.bind;
var _slice = Array.prototype.slice;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Player = (function () {
  function Player(game) {
    _classCallCheck(this, Player);

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

  _createClass(Player, [{
    key: 'update',
    value: function update(cursors) {
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
  }]);

  return Player;
})();

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

exports['default'] = {
  create: function create() {
    return new (_bind.apply(Player, [null].concat(_slice.call(arguments))))();
  }
};
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

exports['default'] = {
  create: function create() {
    _game2['default'].add.text(80, 80, 'My first game');
    _game2['default'].add.text(80, _game2['default'].world.height - 80, 'Press w to start');

    var wkey = _game2['default'].input.keyboard.addKey(Phaser.Keyboard.W);

    //wkey.onDown.addOnce(this.start, this);
    this.start();
  },
  start: function start() {
    _game2['default'].state.start('play');
  }
};
module.exports = exports['default'];

},{"./game":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var player;
var tilemap, layer, cursors;

exports['default'] = {
  create: function create() {
    _game2['default'].stage.backgroundColor = '#787878';

    window.tilemap = tilemap = _game2['default'].add.tilemap('world1-1');

    tilemap.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

    tilemap.setCollisionBetween(15, 16);
    tilemap.setCollisionBetween(20, 25);
    tilemap.setCollisionBetween(27, 29);
    tilemap.setCollision(40);

    layer = tilemap.createLayer('World1');
    layer.resizeWorld();
    layer.wrap = false;

    player = _player2['default'].create(_game2['default']);

    _game2['default'].physics.startSystem(Phaser.Physics.Arcade);

    cursors = _game2['default'].input.keyboard.createCursorKeys();

    _game2['default'].physics.arcade.enable(layer);
  },
  update: function update() {
    var friction = 3;

    _game2['default'].physics.arcade.collide(player.sprite, layer, function (sprite, tile) {
      if (sprite.body.blocked.up) {
        debugger;
      } else if (sprite.body.blocked.down) {
        //debugger;
      }
    });

    player.update(cursors);
  }
};
module.exports = exports['default'];

},{"./game":1,"./player":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

exports['default'] = {
  preload: function preload() {
    _game2['default'].add.text(80, 150, 'loading');
    _game2['default'].load.tilemap('world1-1', './assets/maps/world1-1.json', null, Phaser.Tilemap.TILED_JSON);
    _game2['default'].load.image('tiles', './assets/tiles/super_mario.png');
    _game2['default'].load.spritesheet('mario', './assets/sprites/mario-small.png', 16, 16, 25);
  },
  create: function create() {
    _game2['default'].state.start('menu');
  }
};
module.exports = exports['default'];

},{"./game":1}]},{},[2]);
