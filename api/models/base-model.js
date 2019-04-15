'use strict';
const config = require('../config');
const _ = require('lodash');

class BaseModel {
    constructor(tableName, children = []) {
        this._options = {
            children: children,
            connection: config.connection,
            tableName: tableName
        };
    }

    create(model){
        const params = [];
        const placeholders = [];
        Object.keys(this).filter((key) => (key !== '_options' && key !== '_baseModel')).map(key => {
            params.push(model[key]);
            placeholders.push('?');
        });
        const dbFields = this.getDbFields();

        this._baseModel = {
            sql: `INSERT INTO ${this._options.tableName} (${dbFields.toString()}, created_at, updated_at) VALUES (${placeholders} , NOW(), NOW())`,
            params: params
        };

        return this.query(this._baseModel.sql, this._baseModel.params);
    }

    /**
     * @param {string} id
     * @return {BaseModel}
     */
    find(id) {
        const dbFields = this.getDbFields();
        this._baseModel = {
            sql: `SELECT id, ${dbFields.toString()} FROM ${this._options.tableName} WHERE deleted_at IS NULL AND id = ? LIMIT 1`,
            params: [id]
        };
        return this;
    }

    /**
     * @param {*} model
     * @return {Promise<Array<string>>}
     */
    getDbFields(model = this){
        return _convertToSqlFields(model);
    }

    async run(){
        let sql = `${this._baseModel.sql};`;
        let params = this._baseModel.params;

        if( this._baseModel.children)
            this._baseModel.children.forEach(child => {
                sql += child.sql;
                params = params.concat(child.params);
            });

        const results = await this.query(sql, params);

        if(!results[0][0])
            return results[0];

        let model = results[0][0];
        this._baseModel.children.forEach((child, index) => {
            model = _.merge({},model, {
                [child.tableName]: results[index+1]
            });
        });

        return model;
    }

    /**
     * @param {BaseModel} childModels
     * @return {BaseModel}
     */
    withChildren(childModels){
        const modelChildren = [];
        childModels.forEach(model => {
            if(!this._options.children.includes(model._options.tableName))
                throw new Error('Child model not declared');
            modelChildren.push({
                tableName: model._options.tableName,
                sql: `SELECT id, ${this.getDbFields(model).toString()} 
                      FROM ${model._options.tableName} WHERE deleted_at IS NULL AND ${this._options.tableName.slice(0, -1)}_id = ?`,
                params: this._baseModel.params,

            });
        })
        this._baseModel = _.merge({}, this._baseModel, {
            children: modelChildren
        });
        return this;
    }

    /**
     * @param {String} sql SQL statement
     * @param {Array} params Parameters used in SQL statement in array form
     * @return {Promise<*>}
     */
    async query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this._options.connection.query(sql, params, (error, data) => {
                if (error) {
                    console.error("I FAILED", error);
                    return reject(error);
                }
                resolve(data);
            });
        });
    }

    async update(model = this){
        if(!model.id)
            throw new Error('Id should be provided');
        const params = [];
        const placeholders = ['?'];
        Object.keys(model).filter((key) => (key !== '_options' && key !== '_baseModel' && key !== 'id')).map(key => {
            params.push(model[key]);
        });
        params.push(model.id);
        const dbFields = this.getDbFields();

        this._baseModel = {
            sql: `UPDATE ${this._options.tableName} SET ${dbFields.toString()}, updated_at = NOW() WHERE deleted_at IS NULL AND id = ?`,
            params: params
        };

        return this.query(this._baseModel.sql, this._baseModel.params);
    }
}

/**
 * @return {Promise<Array<string>>}
 * @private
 */
const _convertToSqlFields = (model) => {
    const dbFields = Object.keys(model).filter((key) => (key !== '_options' && key !== '_baseModel')).map(key => {
        let updateField = '';
        const words = key.split(/(?=[A-Z])/);
        words.forEach((word, index) => {
            if (index === 0)
                return updateField += word.toLowerCase();
            return updateField +=`_${word.toLowerCase()}`;
        })
        updateField = `${updateField} = ?`;
        return updateField;
    });
    return dbFields;
}

module.exports = BaseModel;