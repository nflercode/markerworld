import { getTableByInvitationToken } from '../../services/tableService.js'
import { createPlayer, getPlayers } from '../../services/playerService.js'
import { createAuthToken, createRefreshToken } from '../../services/tokenService.js'
import { io as tableIo } from '../../sockets/tableSocket.js'
import { getRoomName } from '../../sockets/socketRoomHelpers.js'
import { createTableWithAuthPayload } from './api-payloads.js'
import { MAX_PLAYERS_IN_TABLE } from '../../constants.js'
import { createErrorPayload } from '../common/common-payloads.js'

function register(app) {
  app.post('/poker/tables/:invitationToken', (req, res) => {
    const { invitationToken } = req.params;
    const { body } = req;

    if (body.name.length < 1) {
      return res.status(400).send(createErrorPayload('Name must me at least 1 charcter'));
    }
  
    const table = getTableByInvitationToken(invitationToken);
    if (!table) {
      console.error(`Could not find table for ${invitationToken}`);
      return res.status(404).send(createErrorPayload('Could not find table'));
    }

    const players = getPlayers(table.id);
    if (players.length === MAX_PLAYERS_IN_TABLE) {
      return res.status(400).send(createErrorPayload('Maximum players in table.'));
    }

    const newPlayer = createPlayer(table.id, body.name);
    players.push(newPlayer);
  
    const authToken = createAuthToken(newPlayer.id, table.id);
    if (!authToken)
      return res.status(500).send(createErrorPayload('Failed to create auth token'));

    const refreshToken = createRefreshToken(newPlayer.id, table.id);
    if (!refreshToken)
      return res.status(500).send(createErrorPayload('Failed to create refresh token'));

    res.send(createTableWithAuthPayload(table, players, authToken, refreshToken));

    const room = getRoomName(table.id);
    tableIo.to(room).emit('player-added', newPlayer);
  });
}

export { register }