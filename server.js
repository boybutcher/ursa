const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get(`/`, (req, res) => {
  res.send('Tracking Ursa...')
  db.clearBears();
})

app.post(`/sighting`, (req, res) => {
  console.log(`POST to /sighting...`);
  db.storeBear(req.body);
  res.send(req.body);
})

app.get(`/sighting/search`, (req, res) => {
  console.log(`GET to /sighting/search...`);
  db.fetchBears((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

app.listen(3000, () => {
  console.log(`Ursa server is listening in on port 3000`);
})
