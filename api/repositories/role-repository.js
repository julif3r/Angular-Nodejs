const _ = require("lodash");
const BaseRepository = require('./base-repository');
const rolesTableName = 'roles';
const claimsTableName = 'claims';

const roleModel = [
    {
        db_name: 'name',
        name: 'name'
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
    },
    {
        db_name: 'alias',
        name: 'alias'
    }
]

class RoleRepository extends BaseRepository {

    constructor() {
        super(rolesTableName, roleModel);
    }

    async createRole(role){
        const result = await this.create(role);
        return _.merge({}, role, {id: result.insertId});
    }

    async deleteRole(roleId){
        await this.delete(roleId);
        return roleId;
    }

    async deleteRoleClaim(claimId){
        const sql = `DELETE FROM ${claimsTableName} WHERE id = ${claimId}`;
        return this.query(sql);
    }

    async getRole(roleId){
        return await this.find(roleId);
    }

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
     * @param {} roleId
     * @return {Promise<*>}
     */
    async updateRole(role, roleId){
        await this.update(role, roleId);
        return role;
    }
}

module.exports = new RoleRepository();