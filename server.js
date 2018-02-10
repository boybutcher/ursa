const express = require('express');

const app = express();

app.get(`/`, (req, res) => {
  res.send('Tracking Ursa...')
})

app.post(`/sighting`, (req, res) => {
  console.log(`hit sighting endpoint...`)
  console.log('req.body: ', req.body);
  res.send(`hit sighting endpoint...`)
})

app.listen(3000, () => {
  console.log(`Ursa server is listening in on port 3000`);
})