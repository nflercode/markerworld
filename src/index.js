import express from 'express'
import { createGroup } from './services/groupService.js'

const app = express();
app.use(express.json());

const port = 3000;

app.post('/poker/groups', (req, res) => {
  const { body } = req;

  const newGroup = createGroup(body.name);
  res.send(newGroup);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});