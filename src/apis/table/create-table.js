import { createTable } from '../../services/tableService.js'
import { createPlayer } from '../../services/playerService.js'
import { createAuthToken, createRefreshToken } from '../../services/tokenService.js'
import { createTableWithAuthPayload } from './api-payloads.js'

function register(app) {
  app.post('/poker/tables', (_, res) => {
    const newTable = createTable("Bordet");
    const newPlayer = createPlayer(newTable.id, "Player 1");
    const players = [newPlayer];

    const authToken = createAuthToken(newPlayer.id, newTable.id);
    if (!authToken)
      return res.status(500).send(createErrorPayload('Failed to create auth token'));

    const refreshToken = createRefreshToken(newPlayer.id, newTable.id);
    if (!refreshToken)
      return res.status(500).send(createErrorPayload('Failed to create refresh token'));

    res.send(createTableWithAuthPayload(newTable, players, authToken, refreshToken));
  });
}

export { register }