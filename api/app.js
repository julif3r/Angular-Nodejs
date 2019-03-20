const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const http = require('http');
const hostname = '0.0.0.0';
const port = 3001;
const server = http.createServer(app);

const users = require('./routes/user-routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', users);


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

