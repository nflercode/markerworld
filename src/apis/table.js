import { createTable, getTable, getTableByInvitationToken } from '../services/tableService.js'
import { createPlayer, getPlayers } from '../services/playerService.js'
import { jwtAuth } from '../middlewares/jwtAuthentication.js'
import { createAuthToken, createRefreshToken } from '../services/tokenService.js'

function register(app) {
  app.post('/poker/tables', (req, res) => {
    const { body } = req;

    const newTable = createTable(body.name);
    const newPlayer = createPlayer(newTable.id, "Player 1");
    const players = [newPlayer];

    const authToken = createAuthToken(newPlayer.id, newTable.id);
    if (!authToken)
      return res.send(500).send({ error: 'Failed to create auth token' });

    const refreshToken = createRefreshToken(newPlayer.id, newTable.id);
    if (!refreshToken)
      return res.send(500).send({ error: 'Failed to create refresh token' });

    res.send({
      table: {
        ...newTable,
        players,
      },
      authToken,
      refreshToken
    });
  });
  
  app.get('/poker/tables', jwtAuth, (req, res) => {
    const { tableId } = req.auth;
    const table = getTable(tableId);
    if (!table) {
      console.log(`Could not find table with id ${tableId} for user with id ${req.auth.userId}`);
      return res.status(500).send({ error: 'Could not find table for user' });
    }
    
    res.send(table);
  });

  app.post('/poker/tables/:invitationToken', (req, res) => {
    const { invitationToken } = req.params;
  
    const table = getTableByInvitationToken(invitationToken);
    if (!table) {
      console.error(`Could not find table for ${invitationToken}`);
      return res.status(404).send({ error: 'Could not find table' });
    }

    const players = getPlayers(table.id);
    const newPlayer = createPlayer(table.id, `Player ${players.length + 1}`);
    players.push(newPlayer);
  
    const authToken = createAuthToken(newPlayer.id, table.id);
    if (!authToken)
      return res.send(500).send({ error: 'Failed to create auth token' });

    const refreshToken = createRefreshToken(newPlayer.id, table.id);
    if (!refreshToken)
      return res.send(500).send({ error: 'Failed to create refresh token' });

    res.send({
      table: {
        ...table,
        players
      },
      authToken,
      refreshToken
    });
  });
}

export { register };