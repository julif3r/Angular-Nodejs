
const database = {
    host: 'api_db',
    user: 'shk-pilot',
    password: 'shk-pilot',
    port: 3306,
    database: 'shk-pilot',
    multipleStatements: true
}

const jwtToken = {
    expiresIn: '12h',
    algorithm: 'RS256'
}

const password = {
    saltRounds: 10
}

const server = {
    port: 3001,
    hostname: '0.0.0.0'
}
module.exports = {
    database,
    jwtToken,
    password,
    server
}