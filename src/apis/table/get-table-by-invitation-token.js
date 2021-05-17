import { getTableByInvitationToken } from '../../services/tableService.js'
import { getPlayers } from '../../services/playerService.js'
import { createTableWithPlayersPayload } from './api-payloads.js';

function register(app) {
  app.get('/poker/tables/:invitationToken', (req, res) => {
    const { invitationToken } = req.params;
  
    const table = getTableByInvitationToken(invitationToken);
    if (!table) {
      console.error(`Could not find table for ${invitationToken}`);
      return res.status(404).send(createErrorPayload('Could not find table'));
    }

    const players = getPlayers(table.id);

    res.send(createTableWithPlayersPayload(table, players));
  });
}

export { register }