const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get(`/`, (req, res) => {
  res.send('Tracking Ursa...')
})

app.post(`/sighting`, (req, res) => {
  console.log(`POST to sighting...`)
  res.send(req.body);
})

app.listen(3000, () => {
  console.log(`Ursa server is listening in on port 3000`);
})