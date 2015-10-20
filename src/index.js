
import game from './game';
import stateMenu from './state-menu';
import statePlay from './state-play';
import statePreload from './state-preload';

window.game = game;

game.state.add('menu', stateMenu);
game.state.add('preload', statePreload);
game.state.add('play', statePlay);

game.state.start('preload');

