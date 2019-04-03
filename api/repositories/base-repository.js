const mysql = require('mysql');
const config = require('../config');


class BaseRepository {

    constructor(tableName, model) {
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
        });
    }

    /*
     * @param data Model
     * @returns {Object} Model
     */
    create(data) {
        const params = this.model.map((field) => {
            return data[field.name] ? data[field.name] : null;
        });

        let dbFields = [];
        let paramPlaceholders = [];
        this.model.forEach(field => {
            dbFields.push(field.db_name);
            paramPlaceholders.push('?');
        });

        const sql = `INSERT INTO ${this.tableName} (${dbFields.toString()}) VALUES (${paramPlaceholders.toString()})`;
        console.log("MODEL_FIELDS", dbFields);
        console.log("MODEL_PARAMS", params);
        return this.query(sql, params);
    }

    delete(id) {
        const params = [id];
        const sql = `UPDATE ${this.tableName} SET deleted_at = now() WHERE id = ?`;

        return this.query(sql, params);
    }

    get() {
        let fields = [];
        this.model.forEach(field => {
            fields.push(`${field.db_name} as ${field.name}`);
        });
        const sql = `SELECT id, ${fields.toString()} FROM ${this.tableName} WHERE deleted_at IS NULL`;
        return this.query(sql);
    }

    find(id) {
        let fields = [];
        this.model.forEach(field => {
            fields.push(`${field.db_name} as ${field.name}`);
        });
        const sql = `SELECT id, ${fields.toString()} FROM ${this.tableName} WHERE deleted_at IS NULL AND id = ? LIMIT 1`;
        return this.query(sql, [id]);
    }

    update(data, id) {
        const params = this.model.map((field) => {
            return data[field.name] ? data[field.name] : null;
        });
        params.push(id);

        const updateFields = this.model.map(field => {
            return `${field.db_name} = ?`
        });

        const sql = `UPDATE ${this.tableName} ${updateFields.toString()} WHERE id = ?`;
        console.log("MODEL_FIELDS", dbFields);
        console.log("MODEL_PARAMS", params);
        return this.query(sql, params);
    }
}

module.exports = BaseRepository;