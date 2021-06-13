import { createAuthToken, compareRefreshToken } from '../../services/tokenService.js'
import { verifyRefreshToken } from '../../jwt/tokenHandler.js'
import { createAuthTokenPayload } from './api-payloads.js';
import { createErrorPayload } from '../common/common-payloads.js';

function register(app) {
  app.post('/auth/refresh-token', async (req, res) => {
    const { body } = req;

    const payload = verifyRefreshToken(body.refreshToken);
    if (!payload)
      return res.status(401).send(createErrorPayload('Failed to verify token, token might be expired'));

    const isOk = await compareRefreshToken(payload.playerId, body.refreshToken);
    if (!isOk)
      return res.status(401).send(createErrorPayload('Token is not valid, player might have left the table'));

    const authToken = createAuthToken(payload.playerId, payload.tableId);
    if (!authToken)
      return res.status(500).send(createErrorPayload('Could not create new auth token'));

    res.send(createAuthTokenPayload(authToken));
  });
}

export { register }