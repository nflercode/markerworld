import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import apiLoader from './apis/api-loader.js';
import { connect as connectSocket } from './sockets/tableSocket.js';
import { isProductionEnvironment, isPrEnvironment, assumeLocal } from './helpers/environmentHelper.js';
import dbEventHandlerTable from './db-event-handlers/table.js';
import dbEventHandlerPlayer from './db-event-handlers/player.js';

import avatarService from './services/avatarService.js';

const allowedOrigins = [];

console.log('Env is:', process.env.ENVIRONMENT);

if (assumeLocal()) {
  console.log('starting as local');
  dotenv.config({ path: process.cwd() + '/.env.local' });
  allowedOrigins.push(/http:\/\/localhost:\d+/);
}

if (isProductionEnvironment()) {
  console.log('starting as production');
  allowedOrigins.push(/https:\/\/mychips.online/);
}

if (isPrEnvironment()) {
  console.log('starting as prenv');
  allowedOrigins.push(/https:\/\/pr-\d+.mychips.online/);
  allowedOrigins.push(/http:\/\/localhost:\d+/);
}

const app = express();
app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.find((o) => o.test(origin)))
      return callback(null, true);

    callback();
  }
}));

async function setupAvatarsDebugAsync() {
 // To be removed, some day.
  const randomAvatar = await avatarService.getRandomAvatar();
  if (!randomAvatar)
    avatarService.setupAvatarsDebug();
  else
    console.log('Avatars is setup. Temp, kinda..', randomAvatar.name);
}

setupAvatarsDebugAsync();

const httpServer = http.createServer(app);
connectSocket(httpServer, allowedOrigins);

dbEventHandlerTable.start();
dbEventHandlerPlayer.start();

apiLoader.loadApis(app);

const port = 3000;
httpServer.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});