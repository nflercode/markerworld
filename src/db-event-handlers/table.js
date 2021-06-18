import { filter } from 'rxjs/operators';
import tableRepository from '../repositories/tableRepository.js';
import { io as tableIo } from '../sockets/tableSocket.js';
import { getRoomName } from '../sockets/socketRoomHelpers.js';
import { getChangedObjectField } from './helpers.js';

function start() {
  tableRepository.subject
    .pipe(filter((event) => event.type === "UPDATED"))
    .subscribe({
      next: (event) => {
        const tableId = event.newValue.id;
        const changedFields = getChangedObjectField(event);
        changedFields.forEach((field) => {
          if (Object.keys(field)[0] === 'name') {
            const room = getRoomName(tableId);
            tableIo.to(room).emit('table-name-change', { id: event.newValue.id, name: event.newValue.name });
          }
        });
      },
      error: (err) => {
        console.error(err);
    }
  });
}

export default { start }