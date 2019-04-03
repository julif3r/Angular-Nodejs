
const roleRepository = require('../repositories/role-repository');
class RoleService {

    async createRole(role){
        return await roleRepository.createRole(role);
    }

    async fetchRoles(){
        return await roleRepository.fetchRoles();
    }

    async fetchRoleClaims(roleId){
        return await roleRepository.fetchClaims(roleId);
    }
}

module.exports = new RoleService();