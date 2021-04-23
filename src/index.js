import express from 'express'
import dotenv from 'dotenv'
import { register as registerAuthApis } from './apis/auth.js'
import { register as registerPlayerApis } from './apis/player.js'
import { register as registerTableApis } from './apis/table.js'

dotenv.config();

const app = express();
app.use(express.json());

registerAuthApis(app);
registerPlayerApis(app);
registerTableApis(app);

const port = 3000;

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});