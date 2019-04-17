const _ = require("lodash");
const BaseRepository = require('./base-repository');
const ClaimModel = require('../models/claim-model');
const RoleModel = require('../models/role-model');
const rolesTableName = 'roles';
const claimsTableName = 'claims';

// const roleModel = [
//     {
//         db_name: 'name',
//         name: 'name'
//     },
//     {
//         db_name: 'alias',
//         name: 'alias'
//     }
// ];

const claimModel = new ClaimModel();
const roleModel = new RoleModel();
class RoleRepository extends BaseRepository {

    constructor() {
        super(rolesTableName, roleModel);
    }


    async test(){
        return roleModel.find(1).withChildren([claimModel]).run()
    }

    /**
     * @param {Role} role
     * @return {Promise<Role>}
     */
    async createRole(role){
        const result = await roleModel.create(role);
        return _.merge({}, role, {id: result.insertId});
    }

    /**
     * @param {Claim} claim
     * @return {Promise<Claim>}
     */
    async createRoleClaim(claim){
        const result = await claimModel.create(claim);
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
        await claimModel.delete(claimId);
        return claimId;
    }

    /**
     * @return {Promise<Array<Role>>}
     */
    async fetchRoles() {
        return await roleModel.get();
    }

    /**
     * @param {string} roleId
     * @return {Promise<Array<Claim>>}
     */
    async fetchRoleClaims(roleId) {
        return roleModel.find(roleId).withChildren([claimModel]).run();
    }

    /**
     * @param {string} roleId
     * @return {Promise<Role>}
     */
    async getRole(roleId){
        return roleModel.find(roleId).run();
    }

    /**
     * Return role with related claims
     * @param {string} roleId
     * @return {Promise<Role>}
     */
    async getRoleWithClaims(roleId){
        return roleModel.find(roleId).withChildren([claimModel]).run();
    }

    /**
     * @param {Role} role
     * @param {string} roleId
     * @return {Promise<Role>}
     */
    async updateRole(role, roleId){
        role = _.merge({}, role, {id: roleId});
        await roleModel.update(role);
        return role;
    }
}

module.exports = new RoleRepository();