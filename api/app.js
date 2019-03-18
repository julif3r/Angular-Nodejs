const express = require('express');

const app = express();
const http = require('http');

const hostname = '0.0.0.0';
const port = 3001;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})