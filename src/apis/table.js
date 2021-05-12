import { createTable, getTable, getTableByInvitationToken, setTableName } from '../services/tableService.js'
import { createPlayer, getPlayers } from '../services/playerService.js'
import { jwtAuth } from '../express-middlewares/jwtAuthentication.js'
import { createAuthToken, createRefreshToken } from '../services/tokenService.js'
import { io } from '../socketIo/socket.js'
import { getRoomName } from '../socketIo/socketRoomHelpers.js'

function register(app) {
  app.post('/poker/tables', (req, res) => {
    const newTable = createTable("Bordet");
    const newPlayer = createPlayer(newTable.id, "Player 1");
    const players = [newPlayer];

    const authToken = createAuthToken(newPlayer.id, newTable.id);
    if (!authToken)
      return res.status(500).send({ error: 'Failed to create auth token' });

    const refreshToken = createRefreshToken(newPlayer.id, newTable.id);
    if (!refreshToken)
      return res.status(500).send({ error: 'Failed to create refresh token' });

    res.send({
      table: {
        ...newTable,
        players,
      },
      authToken: {
        ...authToken,
        expiresAt: authToken.expiresAt.toISOString()
      },
      refreshToken: {
        ...refreshToken,
        expiresAt: refreshToken.expiresAt.toISOString()
      }
    });
  });
  
  app.get('/poker/tables', jwtAuth, (req, res) => {
    const { tableId } = req.auth;
    const table = getTable(tableId);
    if (!table) {
      console.log(`Could not find table with id ${tableId} for user with id ${req.auth.userId}`);
      return res.status(500).send({ error: 'Could not find table for user' });
    }

    const players = getPlayers(tableId);
    
    res.send({
      ...table,
      players
    });
  });

  app.get('/poker/tables/:invitationToken', (req, res) => {
    const { invitationToken } = req.params;
  
    const table = getTableByInvitationToken(invitationToken);
    if (!table) {
      console.error(`Could not find table for ${invitationToken}`);
      return res.status(404).send({ error: 'Could not find table' });
    }

    const players = getPlayers(table.id);

    res.send({
      table: {
        ...table,
        players
      }
    });
  });

  app.post('/poker/tables/:invitationToken', (req, res) => {
    const { invitationToken } = req.params;
    const { body } = req;

    if (body.name.length < 1) {
      return res.status(400).send({ error: 'Name must me at least 1 charcter'});
    }
  
    const table = getTableByInvitationToken(invitationToken);
    if (!table) {
      console.error(`Could not find table for ${invitationToken}`);
      return res.status(404).send({ error: 'Could not find table' });
    }

    const players = getPlayers(table.id);
    const newPlayer = createPlayer(table.id, body.name);
    players.push(newPlayer);
  
    const authToken = createAuthToken(newPlayer.id, table.id);
    if (!authToken)
      return res.status(500).send({ error: 'Failed to create auth token' });

    const refreshToken = createRefreshToken(newPlayer.id, table.id);
    if (!refreshToken)
      return res.status(500).send({ error: 'Failed to create refresh token' });

    res.send({
      table: {
        ...table,
        players
      },
      authToken: {
        ...authToken,
        expiresAt: authToken.expiresAt.toISOString()
      },
      refreshToken: {
        ...refreshToken,
        expiresAt: refreshToken.expiresAt.toISOString()
      }
    });

    const room = getRoomName(table.id);
    io.to(room).emit('player-added', newPlayer);
  });

  app.put('/poker/tables', jwtAuth, (req, res) => {
    const { tableId } = req.auth;
    const { body } = req;
    if (!body.name || body.name.length < 1) 
      return res.status(400).send({ error: 'Name must be atleast 1 charcter' });

    const table = setTableName(tableId, body.name);
  
    if (!table) {
      console.log(`Could not find table with id ${tableId} for user with id ${req.auth.userId}`);
      return res.status(500).send({ error: 'Could not find table for user' });
    }

    res.send(table);

    const room = getRoomName(tableId);
    io.to(room).emit('table-name-change', table)
  });
}

export { register };