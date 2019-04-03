
const roleRepository = require('../repositories/role-repository');
class RoleService {

    async create(){
    }

    async fetchRoles(){
        const roles = await roleRepository.fetchRoles();
        return {data: roles};
    }

    async fetchRoleClaims(roleId){
        const claims = await roleRepository.fetchClaims(roleId);
        return {data: claims};
    }
}