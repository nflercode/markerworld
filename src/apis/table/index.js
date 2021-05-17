import { register as registerCreateTable } from './create-table.js';
import { register as registerGetTableByAuth } from './get-table-by-auth.js';
import { register as registerGetTablebyInvitationToken } from './get-table-by-invitation-token.js';
import { register as registerAddPlayerToTable } from './add-player-to-table.js';
import { register as registerSetTableName } from './set-table-name.js';

function register(app) {
  registerCreateTable(app);
  registerGetTableByAuth(app);
  registerGetTablebyInvitationToken(app);
  registerAddPlayerToTable(app);
  registerSetTableName(app);
}

export { register }