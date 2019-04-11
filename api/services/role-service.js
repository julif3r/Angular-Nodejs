const _ = require('lodash');
const roleRepository = require('../repositories/role-repository');
class RoleService {

    /**
     * @param {!Role} role
     * @return {Promise<!Role>}
     */
    async createRole(role){
        return await roleRepository.createRole(role);
    }

    /**
     * @param {string} roleId
     * @param {!Claim} claim
     * @return {Promise<!Claim>}
     */
    async createRoleClaim(roleId, claim){
        const roleClaim = _.merge({}, claim, {roleId});
        console.log("HEHEE", roleClaim);
        return await roleRepository.createRoleClaim(roleClaim);
    }

    /**
     * @param {string} roleId
     * @return {Promise<string>}
     */
    async deleteRole(roleId){
        return await roleRepository.deleteRole(roleId);
    }

    /**
     * @param {string} roleId
     * @param {*} options
     * @param {boolean} options.withClaims
     * @return {Promise<!Role>}
     */
    async getRole(roleId, options){
        if(options.withClaims){
            const results = await roleRepository.getRoleWithClaims(roleId);
            if(!results[0][0])
                return Promise.resolve({});
            const role = _.merge({}, results[0][0], { claims: results[1]});
            return role;
        }

        return await roleRepository.getRole(roleId);
    }

    /**
     * @return {Promise<!Array<!Role>>}
     */
    async fetchRoles(){
        return await roleRepository.fetchRoles();
    }

    /**
     * @param {string} roleId
     * @return {Promise<!Array<!Claim>>}
     */
    async fetchRoleClaims(roleId){
        return await roleRepository.fetchRoleClaims(roleId);
    }

    /**
     * @param {!Role} role
     * @param {string} roleId
     * @return {Promise<!Role>}
     */
    async updateRole(role, roleId){
        return await roleRepository.updateRole(role, roleId);
    }
}

module.exports = new RoleService();