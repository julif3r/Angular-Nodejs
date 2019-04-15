'use strict';

const BaseModel = require('./base-model');
const tableName = 'claims';

class ClaimModel extends BaseModel{
    constructor() {
        super(tableName);
        this.name = '';
    }
}
module.exports = ClaimModel;