import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import { register as registerAuthApis } from './apis/auth.js'
import { register as registerPlayerApis } from './apis/player.js'
import { register as registerTableApis } from './apis/table.js'
import { setUp as setUpSocket } from './socketIo/socket.js';
import { isProductionEnvironment, isPrEnvironment, assumeLocal } from './helpers/environmentHelper.js';

const allowedOrigins = [];

console.log('Env is:', process.env.ENVIRONMENT);

if (assumeLocal()) {
  console.log('starting as local');
  dotenv.config({path: process.cwd() + '/.env.local'});
  allowedOrigins.push(/http:\/\/localhost:3001/);
}

if (isProductionEnvironment()) {
  console.log('starting as production');
  allowedOrigins.push(/https:\/\/nfler.se/);
}

if (isPrEnvironment()) {
  console.log('starting as prenv');
  allowedOrigins.push(/https:\/\/pr-\d+.nfler.se/);
  allowedOrigins.push(/http:\/\/localhost:3001/);
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

const httpServer = http.createServer(app);
setUpSocket(httpServer, allowedOrigins);

registerAuthApis(app);
registerPlayerApis(app);
registerTableApis(app);

const port = 3000;
httpServer.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});