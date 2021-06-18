import { getTableByInvitationToken } from '../../services/tableService.js'
import { createPlayer } from '../../services/playerService.js'
import { createAuthToken, createRefreshToken } from '../../services/tokenService.js'
import { createTableWithAuthPayload } from './api-payloads.js'
import { MAX_PLAYERS_IN_TABLE } from '../../constants.js'
import { createErrorPayload } from '../common/common-payloads.js'

function register(app) {
  app.post('/poker/tables/:invitationToken', async (req, res) => {
    const { invitationToken } = req.params;
    const { body } = req;

    const table = await getTableByInvitationToken(invitationToken);
    if (!table) {
      console.error(`Could not find table for ${invitationToken}`);
      return res.status(404).send(createErrorPayload('Could not find table'));
    }

    if (table.players.length === MAX_PLAYERS_IN_TABLE) {
      return res.status(400).send(createErrorPayload('Maximum players in table.'));
    }

    const playerName = (body.name && body.name != '') ? body.name : `Player ${(table.players.length + 1)}`;
    const newPlayer = await createPlayer(table.id, playerName);
    console.log(JSON.stringify(newPlayer, null, 2));
    table.players.push({ ...newPlayer, isMe: true });
  
    const authToken = createAuthToken(newPlayer.id, table.id);
    if (!authToken)
      return res.status(500).send(createErrorPayload('Failed to create auth token'));

    const refreshToken = await createRefreshToken(newPlayer.id, table.id);
    if (!refreshToken)
      return res.status(500).send(createErrorPayload('Failed to create refresh token'));

    res.send(createTableWithAuthPayload(table, table.players, authToken, refreshToken));
  });
}

export { register }