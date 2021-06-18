import avatarService from '../services/avatarService.js';
import { io as tableIo } from '../sockets/tableSocket.js';
import { getRoomName } from '../sockets/socketRoomHelpers.js';
import { getChangedObjectField } from './helpers.js';
import playerRepository from '../repositories/playerRepository.js';

function start() {
  playerRepository.subject
    .subscribe({
      next: (event) => {
        switch(event.type) {
          case "UPDATED":
            handleUpdate(event);
            break;
          case "CREATED":
            handleCreate(event);
            break;
          case "DELETED":
            handleDelete(event);
            break;
        }
      },
      error: (err) => {
        console.error(err);
    }
  });
}

function handleDelete(event) {
  console.log('GOT EVENT DELETED!', JSON.stringify(event, null, 2));
  const tableId = event.doc.tableId;
  const room = getRoomName(tableId);
  tableIo.to(room).emit('player-removed', event.doc.id);
}

function handleCreate(event) {
  console.log('GOT EVENT CREATED!', JSON.stringify(event, null, 2));

  // Event docs does not have joined docs ... therefor add avatar:
  avatarService.getAvatar(event.doc.avatarId).then((avatar) => {
    const tableId = event.doc.tableId;
    const room = getRoomName(tableId);
    tableIo.to(room).emit('player-added', {
      avatar,
      ...event.doc
    });
  });
}

function handleUpdate(event) {
  const tableId = event.newValue.tableId;
  const changedFields = getChangedObjectField(event);
  changedFields.forEach((field) => {
    if (Object.keys(field)[0] === 'name') {
      console.log('Player has changed name. Sending name changed event ..');
      const room = getRoomName(tableId);
      tableIo.to(room).emit('player-name-change', { id: event.newValue.id, name: event.newValue.name });
    }
  });
}

export default { start }