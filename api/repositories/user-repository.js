const _ = require('lodash');
const BaseRepository = require('./base-repository');

const usersTableName = 'users';
const userModel = [
    {
        db_name: 'first_name',
        name: 'firstName'
    },
    {
        db_name: 'last_name',
        name: 'lastName'
    },
    {
        db_name: 'email',
        name: 'email'
    }
]

class UserRepository extends BaseRepository {

    constructor() {
        super(usersTableName, userModel);
    }

    /**
     * @param {Object} user
     * @returns {Object} user
     */
    async createUser(user) {
        const response = await this.create(user);
        return _.merge({}, user, {id: response.insertId});
    }

    async deleteUser(userId) {
        const params = [userId];
        const sql = `UPDATE ${usersTableName} SET deleted_at = now() WHERE id = ?`;

        await this.query(sql, params);
        return {};
    }

    async fetchUsers() {
        const sql = `SELECT first_name as firstName, last_name as lastName, email FROM ${usersTableName} WHERE deleted_at IS NULL`;
        return await this.query(sql);
    }

    async getUser(userId) {
        const params = [userId];
        const sql = `SELECT first_name as firstName, last_name as lastName, email FROM ${usersTableName} WHERE id = ?`;
        return await this.query(sql, params);
    }

    async updateUser(user, userId) {
        const params = [user.firstName, user.lastName, user.email, userId];
        const columns = `first_name = ?, last_name = ?, email = ?`;

        const sql = `UPDATE ${usersTableName} SET ${columns} WHERE id = ?`;

        await this.query(sql, params);
        return user;
    }

}

module.exports = new UserRepository();