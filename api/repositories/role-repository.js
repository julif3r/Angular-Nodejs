const BaseRepository = require('./base-repository');
const rolesTableName = 'roles';
const claimsTableName = 'claims';

const roleModel = {
    name: 'required'
};

class RoleRepository extends BaseRepository{
    fetchRoles(){
        const sql = `SELECT name FROM ${rolesTableName} WHERE deleted_at IS NULL`;
        return await this.query(sql);
    }

    fetchClaims(roleId){
        const sql = `SELECT name FROM ${claimsTableName} WHERE deleted_at IS NULL AND role_id = ${roleId}`;
        return await this.query(sql);
    }
}

module.exports = new RoleRepository();