import { getEarliestExpiration, getExpirationForAuth, deleteExpirationForAuth } from '../services/tokenService.js'
import { disconnectSocketForPlayer } from '../socketIo/socket.js';

function start() {
  const earliestExpiration = getEarliestExpiration();

  if (!earliestExpiration) {
    setTimeout(() => {
      start();
    }, 1000);

    return;
  }
    
  const expirationInMs = Date.parse(earliestExpiration.expiresAt);
  const diff = expirationInMs - Date.now();

  console.log('Next expiration is in', diff, 'ms', 'playerId', earliestExpiration.playerId);

  setTimeout(() => {
    const expiration = getExpirationForAuth(earliestExpiration.playerId);
    if (!expiration) {
      console.log('expiration does no longer exist, player might have been removed');
      start();
      return;
    }

    if (Date.parse(expiration.expiresAt) < Date.now()) {
      console.log('expired!');

      disconnectSocketForPlayer(expiration.playerId);
      deleteExpirationForAuth(expiration.playerId);
    } else {
      console.log('no longer expired..');
    }

    start();
  }, diff);
}

export { start }