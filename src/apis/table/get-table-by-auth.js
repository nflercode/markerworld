import { getTable } from '../../services/tableService.js';
import { jwtAuth } from '../middlewares/jwtAuthentication.js';
import { createTableWithPlayersPayload } from './api-payloads.js';
import { createErrorPayload, API_PREFIX } from '../common/common-payloads.js';

function register(app) {
  app.get(`/${API_PREFIX}/poker/tables`, jwtAuth, async (req, res) => {
    const { tableId, playerId } = req.auth;

    const table = await getTable(tableId);
    if (!table) {
      console.log(`Could not find table with id ${tableId} for user with id ${req.auth.userId}`);
      return res.status(404).send(createErrorPayload('Could not find table for user'));
    }

    const isMePlayerIndex = table.players.findIndex(player => player.id === playerId);
    table.players[isMePlayerIndex].isMe = true;

    res.send(createTableWithPlayersPayload(table, table.players));
  });
}

export { register }