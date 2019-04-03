
const roleRepository = require('../repositories/role-repository');
class RoleService {

    async createRole(role){
        return await roleRepository.createRole(role);
    }

    async deleteRole(roleId){
        return await roleRepository.deleteRole(roleId);
    }

    async getRole(roleId){
        return await roleRepository.getRole(roleId);
    }

    async fetchRoles(){
        return await roleRepository.fetchRoles();
    }

    async fetchRoleClaims(roleId){
        return await roleRepository.fetchClaims(roleId);
    }

    async updateRole(role, roleId){
        return await roleRepository.updateRole(role, roleId);
    }
}

module.exports = new RoleService();