
import game from './game';

export default {
  preload : function() {
    game.add.text(80, 150, 'loading');
    game.load.tilemap('world1-1', './assets/maps/world1-1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', './assets/tiles/super_mario.png');
    game.load.spritesheet('mario', './assets/sprites/mario-small.png', 16, 16, 25);
  },
  create: function() {
    game.state.start('menu');
  }
}