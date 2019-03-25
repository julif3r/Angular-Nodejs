const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const http = require('http');
const hostname = '0.0.0.0';
const port = 3001;
const server = http.createServer(app);

const auth = require('./routes/auth-routes');
const users = require('./routes/user-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', users);
app.use('/login', auth);


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

