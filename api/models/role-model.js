'use strict';

const BaseModel = require('./base-model');
const tableName = 'roles';
const children = ['claims'];

class RoleModel extends BaseModel{
    constructor() {
        super(tableName, children);
        this.name = '';
        this.alias = '';
    }
}
module.exports = RoleModel;