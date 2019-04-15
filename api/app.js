const authService = require('./services/auth-service');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
const express = require('express');
const http = require('http');

const auth = require('./routes/auth-routes');
const roles = require('./routes/role-routes');
const users = require('./routes/user-routes');
const testRoute = require('./routes/test-routes');

const app = express();
const server = http.createServer(app);

//Authorizer midleware
app.use((request, response, next) => {
  //This route is public
  if(request.url === '/login'){
    return next();
  }

  const token = request.headers.authorization;
  const options = {
    issuer: 'SHK',
    subject: 'DritonNaserBerisha@gmail.com',
    audience: 'http://localhost:4200'
  };

  const authorize = authService.verify(token, options);

  if(!authorize)
    response.status(403).json({ message: 'You are not authorized' });
  request.user = authorize.user;
  return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//ROUTES
app.use('/', auth);
app.use('/roles', roles);
app.use('/users', users);
app.use('/test', testRoute);


server.listen(config.server.port, config.server.hostname, () => {
  console.log(`Server running at http://${config.server.hostname}:${config.server.port}/`);
});


