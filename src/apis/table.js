import { createTable, getTable, getTableByInvitationToken } from '../services/tableService.js'
import { createPlayer, getPlayers } from '../services/playerService.js'
import { jwtAuth } from '../middlewares/jwtAuthentication.js'
import { createAuthToken, createRefreshToken } from '../services/tokenService.js'

function register(app) {
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
}

export { register };