import express from 'express'
import { createTable, getTable, getTableByInvitationToken } from './services/tableService.js'
import { createPlayer, removePlayer, getPlayers } from './services/playerService.js'
import { jwtAuth } from './middlewares/jwtAuthentication.js'
import { createAuthToken, createRefreshToken, getRefreshToken, removeRefreshToken } from './services/tokenService.js'
import { verifyRefreshToken } from './jwt/tokenHandler.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const port = 3000;

app.post('/poker/tables', (req, res) => {
  const { body } = req;

  const newTable = createTable(body.name);
  const newPlayer = createPlayer(newTable.id);
  const players = [newPlayer];

  const authToken = createAuthToken(newPlayer.id, newTable.id);
  const refreshToken = createRefreshToken(newPlayer.id, newTable.id);

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
  const table = getTable(tableId, "Player 1");
  
  res.send(table);
});

app.post('/auth/refresh-token', (req, res) => {
  const { body } = req;

  const payload = verifyRefreshToken(body.refreshToken);
  const tokenEntity = getRefreshToken(payload.playerId);
  if (!body.refreshToken === tokenEntity.refreshToken)
    res.sendStatus(401);

  const authToken = createAuthToken(payload.playerId, payload.tableId);
  res.send({
    authToken
  })
});

app.delete('/poker/players', jwtAuth, (req, res) => {
  console.log(req.auth);
  const { playerId } = req.auth;

  console.log(`deleting token for ${playerId}`);
  removePlayer(playerId);
  removeRefreshToken(playerId);

  res.sendStatus(200);
});

app.post('/poker/tables/:invitationToken', (req, res) => {
  const { invitationToken } = req.params;

  const table = getTableByInvitationToken(invitationToken);
  const players = getPlayers(table.id);
  const newPlayer = createPlayer(table.id, `Player ${players.length + 1}`);
  players.push(newPlayer);

  const authToken = createAuthToken(newPlayer.id, table.id);
  const refreshToken = createRefreshToken(newPlayer.id, table.id);

  res.send({
    table: {
      ...table,
      players
    },
    authToken,
    refreshToken
  })
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});