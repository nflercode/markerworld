import { Server as SocketIo } from 'socket.io'
import { getRoomName } from '../helpers/socketRoomHelpers.js';
import { jwtAuth } from '../socket-middlewares/jwtAuthentication.js';

let io;

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

    console.log('Successfully connected player', auth.playerId, 'to room', roomId);
  });
}

export { setUp, io }