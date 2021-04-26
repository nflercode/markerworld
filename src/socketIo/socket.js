import { Server as SocketIo } from 'socket.io'
import { getRoomName } from '../helpers/socketRoomHelpers.js';
import { jwtAuth } from '../socket-middlewares/jwtAuthentication.js';

let io;

function setUp(httpServer) {
  io = new SocketIo(httpServer, {
    cors: {
      origin: 'http://localhost:3001',
      methods: ["GET", "POST"]
    }
  });

  io.use(jwtAuth);
  
  io.on('connection', (socket) => {
    const { auth } = socket;
    const roomId = getRoomName(auth.tableId);
    socket.join(roomId);
    console.log('Successfully connected player', auth.playerId, 'to room', roomId);
  });
}

export { setUp, io }