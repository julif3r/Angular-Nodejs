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
    }
]

class RoleRepository extends BaseRepository {

    constructor() {
        super(rolesTableName, roleModel);
    }

    async get(id){

    }

    async fetchRoles() {
        const roles = await this.get();
        return {data: roles};
    }

    fetchRoleClaims(roleId) {
        const fields = claimModel.map(field => {
            return `${field.db_name} as ${field.name}`;
        });

        const sql = `SELECT name FROM ${fields.toString()} WHERE deleted_at IS NULL AND role_id = ${roleId}`;
        return this.query(sql);
    }
}

module.exports = new RoleRepository();