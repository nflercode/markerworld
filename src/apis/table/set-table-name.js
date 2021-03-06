import { setTableName } from '../../services/tableService.js';
import { API_PREFIX, createErrorPayload } from '../common/common-payloads.js';
import { jwtAuth } from '../middlewares/jwtAuthentication.js';
import { createTablePayload } from './api-payloads.js';

function register(app) {
  app.put(`/${API_PREFIX}/poker/tables`, jwtAuth, async (req, res) => {
    const { tableId } = req.auth;
    const { body } = req;

    if (!body.name || body.name.length < 1) 
      return res.status(400).send(createErrorPayload('Name must be atleast 1 character'));

    const table = await setTableName(tableId, body.name);
    if (!table) {
      console.log(`Could not find table with id ${tableId} for user with id ${req.auth.userId}`);
      return res.status(500).send(createErrorPayload('Could not find table for user'));
    }

    res.send(createTablePayload(table));
  });
}

export { register };