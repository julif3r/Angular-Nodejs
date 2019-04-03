const dotenv = require('dotenv');
//Read .env file
dotenv.config();

const database = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'shk-pilot',
    password: process.env.DB_PASSWORD || 'shk-pilot',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'shk-pilot',
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
    port: process.env.PORT || 3001,
    hostname: process.env.HOST || '127.0.0.1'
};
module.exports = {
    database,
    jwtToken,
    password,
    server
};