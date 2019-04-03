const _ = require("lodash");
const BaseRepository = require('./base-repository');
const rolesTableName = 'roles';
const claimsTableName = 'claims';

const roleModel = [
    {
        db_name: 'name',
        name: 'name'
    },
    {
        db_name: 'alias',
        name: 'alias'
    }
];
const claimModel = [
    {
        db_name: 'role_id',
        name: 'roleId'
    },
    {
        db_name: 'name',
        name: 'name'
    }
]

class RoleRepository extends BaseRepository {

    constructor() {
        super(rolesTableName, roleModel);
    }

    /**
     * @param {!Role} role
     * @return {Promise<!Role>}
     */
    async createRole(role){
        const result = await this.create(role);
        return _.merge({}, role, {id: result.insertId});
    }

    /**
     * @param {!Claim} claim
     * @return {Promise<!Claim>}
     */
    async createRoleClaim(claim){
        const result = await this.create(claim, claimsTableName, claimModel);
        return _.merge({}, claim, {id: result.insertId});
    }

    /**
     * @param {string} roleId
     * @return {Promise<string>}
     */
    async deleteRole(roleId){
        return await this.delete(roleId);
    }

    /**
     * @param {string} claimId
     * @return {Promise<string>}
     */
    async deleteRoleClaim(claimId){
        await this.delete(claimId, claimsTableName, claimModel);
        return claimId;
    }

    /**
     * @param {string} roleId
     * @return {Promise<!Role>}
     */
    async getRole(roleId){
        return await this.find(roleId);
    }

    /**
     * @return {Promise<!Array<!Role>>}
     */
    async fetchRoles() {
        return await this.get();
    }

    async fetchRoleClaims(roleId) {
        const fields = claimModel.map(field => {
            return `${field.db_name} as ${field.name}`;
        });

        const sql = `SELECT name FROM ${fields.toString()} WHERE deleted_at IS NULL AND role_id = ${roleId}`;
        return this.query(sql);
    }

    /**
     * @param {!Role} role
     * @param {string} roleId
     * @return {Promise<!Role>}
     */
    async updateRole(role, roleId){
        await this.update(role, roleId);
        return role;
    }
}

module.exports = new RoleRepository();