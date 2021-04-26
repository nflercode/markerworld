import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import { register as registerAuthApis } from './apis/auth.js'
import { register as registerPlayerApis } from './apis/player.js'
import { register as registerTableApis } from './apis/table.js'
import { setUp as setUpSocket } from './socketIo/socket.js';
import { isProductionEnvironment, isPrEnvironment, assumeLocal } from './helpers/environmentHelper.js';

const allowedOrigin = [];

if (assumeLocal()) {
  console.log('starting as local');
  dotenv.config({path: process.cwd() + '/.env.local'});
  allowedOrigin.push(/http:\/\/localhost:3001/);
}

if (isProductionEnvironment()) {
  console.log('starting as production');
  allowedOrigin.push(/https:\/\/nfler.se/);
}

if (isPrEnvironment()) {
  console.log('starting as prenv');
  allowedOrigin.push(/https:\/\/pr-\d+.nfler.se/);
}

const app = express();
app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigin.find((o) => o.test(origin) === true))
      return callback(null, true);

    callback(new Error(`Cors error: ${origin} does not have access`));
  }
}));

const httpServer = http.createServer(app);
setUpSocket(httpServer);

registerAuthApis(app);
registerPlayerApis(app);
registerTableApis(app);

const port = 3000;
httpServer.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});