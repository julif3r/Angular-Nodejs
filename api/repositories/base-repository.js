const config = require('../config');
const mysql = require('mysql');

class BaseRepository {

    /**
     * @param {string} tableName
     * @param {*} model
     */
    constructor(tableName, model) {
        this.connection = mysql.createConnection(config.database);
        this.model = model;
        this.tableName = tableName;
    }

    /**
     * @param {String} sql SQL statement
     * @param {Array} params Parameters used in SQL statement in array form
     * @return {Promise<*>}
     */
    async query(sql, params = []) {
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

    /**
     * @param {*} data
     * @param {string=} tableName
     * @param {*=} model
     * @return {Promise<*>}
     */
    async create(data, tableName = null, model = null) {
        if(!tableName)
            tableName = this.tableName;
        if(!model)
            model = this.model;

        console.log("TABLE_NAME", tableName);

        const params = model.map((field) => {
            return data[field.name] ? data[field.name] : null;
        });

        let dbFields = [];
        let paramPlaceholders = [];
        model.forEach(field => {
            dbFields.push(field.db_name);
            paramPlaceholders.push('?');
        });

        const sql = `INSERT INTO ${tableName} (${dbFields.toString()}, created_at, updated_at) VALUES (${paramPlaceholders.toString()}, NOW(), NOW())`;
        return this.query(sql, params);
    }

    /**
     * @param {number} id
     * @param {string=} tableName
     * @return {Promise<boolean>}
     */
    async delete(id, tableName = null) {
        if(!tableName)
            tableName = this.tableName;

        const params = [id];
        const sql = `UPDATE ${tableName} SET deleted_at = now() WHERE id = ?`;

        const result = await this.query(sql, params);
        console.log("RESULSTS", result);
        if(result.affectedRows !== 1)
            throw new Error('something went wrong');
        return true;
    }

    /**
     * @param {string=} tableName
     * @param {string=} model
     * @return {Promise<!Array<*>>}
     */
    async get(tableName = null, model = null) {
        if(!tableName)
            tableName = this.tableName;
        if(!model)
            model = this.model;

        let fields = [];
        model.forEach(field => {
            fields.push(`${field.db_name} as ${field.name}`);
        });
        const sql = `SELECT id, ${fields.toString()} FROM ${tableName} WHERE deleted_at IS NULL`;
        return this.query(sql);
    }

    /**
     * @param {number} id
     * @param {string=} tableName
     * @param {string=} model
     * @return {Promise<*>}
     */
    async find(id, tableName, model) {
        if(!tableName)
            tableName = this.tableName;
        if(!model)
            model = this.model;

        let fields = [];
        model.forEach(field => {
            fields.push(`${field.db_name} as ${field.name}`);
        });
        const sql = `SELECT id, ${fields.toString()} FROM ${tableName} WHERE deleted_at IS NULL AND id = ? LIMIT 1`;
        const result = await this.query(sql, [id]);

        return result && result[0];
    }

    /**
     * @param {*} data
     * @param {number} id
     * @param {string=} tableName
     * @param {*=} model
     * @return {Promise<*>}
     */
    async update(data, id, tableName = null, model = null) {
        if(!tableName)
            tableName = this.tableName;
        if(!model)
            model = this.model;

        const params = this.model.map((field) => {
            return data[field.name] ? data[field.name] : null;
        });
        params.push(id);

        const updateFields = this.model.map(field => {
            return `${field.db_name} = ?`
        });

        const sql = `UPDATE ${this.tableName} SET ${updateFields.toString()}, updated_at = NOW() WHERE deleted_at IS NULL AND id = ?`;
        console.log("MODEL_PARAMS", params);
        return this.query(sql, params);
    }
}

module.exports = BaseRepository;