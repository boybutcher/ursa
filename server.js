const http = require('http');

const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Tracking Ursa...');
});

server.listen(port, hostname, () => {
  console.log(`Ursa is running at http://${host}:${port}/`);
});