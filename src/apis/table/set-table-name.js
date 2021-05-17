import { setTableName } from '../../services/tableService.js'
import { jwtAuth } from '../middlewares/jwtAuthentication.js'
import { io as tableIo } from '../../sockets/tableSocket.js'
import { getRoomName } from '../../sockets/socketRoomHelpers.js'
import { createTablePayload } from './api-payloads.js'

function register(app) {
  app.put('/poker/tables', jwtAuth, (req, res) => {
    const { tableId } = req.auth;
    const { body } = req;

    if (!body.name || body.name.length < 1) 
      return res.status(400).send(createErrorPayload('Name must be atleast 1 character'));

    const table = setTableName(tableId, body.name);
  
    if (!table) {
      console.log(`Could not find table with id ${tableId} for user with id ${req.auth.userId}`);
      return res.status(500).send(createErrorPayload('Could not find table for user'));
    }

    res.send(createTablePayload(table));

    const room = getRoomName(tableId);
    tableIo.to(room).emit('table-name-change', table)
  });
}

export { register };