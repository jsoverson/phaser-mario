import game from './game';
import Player from './player';

var player;
var tilemap, layer, cursors;

export default {
  create: function () {
    game.stage.backgroundColor = '#787878';

    window.tilemap = tilemap = game.add.tilemap('world1-1');
    
    tilemap.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    
    tilemap.setCollisionBetween(15, 16);
    tilemap.setCollisionBetween(20, 25);
    tilemap.setCollisionBetween(27, 29);
    tilemap.setCollision(40);
    
    layer = tilemap.createLayer('World1');
    layer.resizeWorld();
    layer.wrap = false;
    
    player = Player.create(game);

    game.physics.startSystem(Phaser.Physics.Arcade);

    cursors = game.input.keyboard.createCursorKeys();

    game.physics.arcade.enable(layer);
    

  },
  update: function () {
    var friction = 3;
    
    game.physics.arcade.collide(player.sprite, layer, function(sprite, tile){
      if (sprite.body.blocked.up) {
        debugger;
      } else if (sprite.body.blocked.down) {
         //debugger;
      }
    });
    
    player.update(cursors);
    
  }
}
