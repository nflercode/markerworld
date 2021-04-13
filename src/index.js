const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/v3', (req, res) => {
  res.send({
    rare: 'feature v3'
  });
});

app.get('/group', (req, res) => {
  res.send({
    id: 1,
    name: "my try group"
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});