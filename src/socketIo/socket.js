import { Server as SocketIo } from 'socket.io'
import { getRoomName } from './socketRoomHelpers.js';
import { jwtAuth } from '../socket-middlewares/jwtAuthentication.js';

let io;
const _allSockets = {};

function setUp(httpServer, allowedOrigins) {
  io = new SocketIo(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"]
    }
  });

  io.use(jwtAuth);
  
  // TODO: check socket reconnect new token
  io.on('connection', (socket) => {
    const { auth } = socket;
    const roomId = getRoomName(auth.tableId);

    socket.join(roomId);

    // TODO: Verify authToken over time

    console.log('Successfully connected player', auth.playerId, 'to room', roomId, socket.id);

    socket.on('disconnect', () => {
      console.log('Disconneting socket for', auth.playerId);
      delete _allSockets[auth.playerId];
    });

    _allSockets[auth.playerId] = socket;
  });
}

function disconnectSocketForPlayer(playerId) {
  const socket = _allSockets[playerId];
  if (!socket) {
    console.error('Tried to disconnect non-existing socket');
    return;
  }

  socket.disconnect();
}

export { setUp, io, disconnectSocketForPlayer }