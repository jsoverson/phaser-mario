
import game from './game';

export default {
  create : function() {
    game.add.text(80, 80, 'My first game');
    game.add.text(80, game.world.height - 80, 'Press w to start');
    
    var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    
    //wkey.onDown.addOnce(this.start, this);
    this.start();
  },
  start: function() {
    game.state.start('play');
  }
}