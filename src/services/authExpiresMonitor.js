import { getEarliestExpiration, getExpirationForAuth, deleteExpirationForAuth } from '../services/tokenService.js'
import { disconnectSocketForPlayer } from '../socketIo/socket.js';
const allExpires = [];

function start() {
  const earliestExpiration = getEarliestExpiration();
  const alreadyInQueue = allExpires.findIndex((ex) => ex.playerId === earliestExpiration.playerId) > -1;

  if (!earliestExpiration || alreadyInQueue) {
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
    if (Date.parse(expiration.expiresAt) < Date.now()) {
      console.log('expired!');

      const index = allExpires.findIndex((ex) => ex.playerId === earliestExpiration.playerId) > -1;
      disconnectSocketForPlayer(expiration.playerId);
      deleteExpirationForAuth(expiration.playerId);
      allExpires.splice(index, 1);
    } else {
      console.log('no longer expired..');
    }

    start();
  }, diff);
}

export { start }