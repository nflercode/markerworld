import { register as registerDeletePlayer } from './delete-player.js';
import { register as registerSetPlayerName } from './set-player-name.js';

function register(app) {
  registerDeletePlayer(app);
  registerSetPlayerName(app);
}

export { register }