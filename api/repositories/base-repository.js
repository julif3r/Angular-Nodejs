const mysql = require('mysql');
const config = require('../config');

class BaseRepository {

    constructor(tableName, model){
        this.connection = mysql.createConnection(config.database);
        this.model = model;
        this.tableName = tableName;
    }

    /**
     * @param {String} sql SQL statement
     * @param {Array} params Parameters used in SQL statement in array form
     */
    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (error, data) => {
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

    create(data) {
        const params = this.model.map((field) => {
            return data[field.name] ? data[field.name] : null;
        });

        let dbFields = [];
        let paramPlaceholders = [];
        this.model.forEach(field => {
            dbFields.push(field.db_name);
            paramPlaceholders.push('?');
        })

        const sql = `INSERT INTO ${this.tableName} (${dbFields.toString()}) VALUES (${paramPlaceholders.toString()})`;
        console.log("MODEL_FIELDS", dbFields);
        console.log("MODEL_PARAMS", params);
        return this.query(sql, params);
    }

    update(query) {

    }

    delete(query) {

    }
}

module.exports = BaseRepository;