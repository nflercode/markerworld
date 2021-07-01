import { removePlayer } from '../../services/playerService.js';
import { jwtAuth } from '../middlewares/jwtAuthentication.js';
import { removeRefreshToken } from '../../services/tokenService.js';
import { createErrorPayload, API_PREFIX } from '../common/common-payloads.js';
import { disconnectSocketForPlayer } from '../../sockets/tableSocket.js';

function register(app) {
  app.delete(`/${API_PREFIX}/poker/players`, jwtAuth, async (req, res) => {
    const { playerId } = req.auth;

    const playerRemoved = await removePlayer(playerId);
    if (!playerRemoved) {
      console.error(`Failed to remove player ${playerId}`);
      return res.status(500).send(createErrorPayload('Failed to remove player'));
    }

    const refreshTokenRemoved = await removeRefreshToken(playerId);
    if (!refreshTokenRemoved) {
      console.log(`Failed to remove refreshToken for player ${playerId}`);
      return res.status(500).send(createErrorPayload('Failed to remove player'));
    }

    disconnectSocketForPlayer(playerId);

    // TODO: Invalidate authToken
    res.sendStatus(200);
  });
}

export { register }