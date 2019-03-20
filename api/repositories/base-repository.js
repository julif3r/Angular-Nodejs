const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config.database);

class BaseRepository {

    /**
     * @param {String} sql SQL statement
     * @param {Array} params Parameters used in SQL statement in array form
     */
    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, (error, data) => {
                if (error) {
                    console.error("I FAILED", error);
                    return reject(error);
                }
                resolve(data);
            });
        })
    }

    get(query) {

    }

    insert(query) {

    }

    update(query) {

    }

    delete(query) {

    }
}

module.exports = BaseRepository;