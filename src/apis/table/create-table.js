import { createTable } from '../../services/tableService.js'
import { createPlayer } from '../../services/playerService.js'
import { createAuthToken, createRefreshToken } from '../../services/tokenService.js'
import { createTableWithAuthPayload } from './api-payloads.js'
import { createErrorPayload, API_PREFIX } from '../common/common-payloads.js';

function register(app) {
  app.post(`/${API_PREFIX}/poker/tables`, async (_, res) => {
    const newTable = await createTable("Bordet");
    const newPlayer = await createPlayer(newTable.id, "Player 1");
    const players = [{ ...newPlayer, isMe: true }];

    const authToken = createAuthToken(newPlayer.id, newTable.id);
    if (!authToken)
      return res.status(500).send(createErrorPayload('Failed to create auth token'));

    const refreshToken = await createRefreshToken(newPlayer.id, newTable.id);
    if (!refreshToken)
      return res.status(500).send(createErrorPayload('Failed to create refresh token'));

    res.send(createTableWithAuthPayload(newTable, players, authToken, refreshToken));
  });
}

export { register }