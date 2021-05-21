import { getTable } from '../../services/tableService.js';
import { getPlayers } from '../../services/playerService.js';
import { jwtAuth } from '../middlewares/jwtAuthentication.js';
import { createTableWithPlayersPayload } from './api-payloads.js';

function register(app) {
  app.get('/poker/tables', jwtAuth, (req, res) => {
    const { tableId, playerId } = req.auth;

    const table = getTable(tableId);
    if (!table) {
      console.log(`Could not find table with id ${tableId} for user with id ${req.auth.userId}`);
      return res.status(404).send(createErrorPayload('Could not find table for user'));
    }

    let players = getPlayers(tableId);

    const isMePlayerIndex = players.findIndex(player => player.id === playerId);
    players[isMePlayerIndex].isMe = true;

    res.send(createTableWithPlayersPayload(table, players));
  });
}

export { register }