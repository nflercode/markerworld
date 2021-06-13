import { getTableByInvitationToken } from '../../services/tableService.js'
import { createTablePayload } from './api-payloads.js';
import { createErrorPayload } from '../common/common-payloads.js';

function register(app) {
  app.get('/poker/tables/:invitationToken', async (req, res) => {
    const { invitationToken } = req.params;
  
    const table = await getTableByInvitationToken(invitationToken);
    if (!table) {
      console.error(`Could not find table for ${invitationToken}`);
      return res.status(404).send(createErrorPayload('Could not find table'));
    }

    res.send(createTablePayload(table));
  });
}

export { register }