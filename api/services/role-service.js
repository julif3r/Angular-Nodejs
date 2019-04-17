const _ = require('lodash');
const roleRepository = require('../repositories/role-repository');
class RoleService {

    async test(){
        return await roleRepository.test();
    }

    /**
     * @param {!Role} role
     * @return {Promise<!Role>}
     */
    async createRole(role){
        return roleRepository.createRole(role);
    }

    /**
     * @param {string} roleId
     * @param {!Claim} claim
     * @return {Promise<!Claim>}
     */
    async createRoleClaim(roleId, claim){
        const roleClaim = _.merge({}, claim, {roleId});
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
     * @param {string} claimId
     * @return {Promise<string>}
     */
    async deleteRoleClaim(claimId){
        return roleRepository.deleteRoleClaim(claimId);
    }

    /**
     * @param {string} roleId
     * @param {*} options
     * @param {boolean} options.withClaims
     * @return {Promise<!Role>}
     */
    async getRole(roleId, options){
        if(options.withClaims && JSON.parse(options.withClaims))
            return roleRepository.getRoleWithClaims(roleId);
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
     * @return {Promise<Role>}
     */
    async fetchRoleClaims(roleId){
        return roleRepository.fetchRoleClaims(roleId);
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