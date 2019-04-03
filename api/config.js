const dotenv = require('dotenv');
//Read .env file
dotenv.config();

const database = {
    host: 'api_db',
    user: 'shk-pilot',
    password: 'shk-pilot',
    port: 3306,
    database: 'shk-pilot',
    multipleStatements: true
};

const jwtToken = {
    expiresIn: '12h',
    algorithm: 'RS256'
};

const password = {
    saltRounds: 10
};

const server = {
    port: process.env.PORT,
    hostname: process.env.HOST
};
module.exports = {
    database,
    jwtToken,
    password,
    server
};