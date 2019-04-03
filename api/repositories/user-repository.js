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
    },
    {
        db_name: 'password',
        name: 'password'
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
        return {
            data: _.merge({}, user, {id: response.insertId})
        };
    }

    /**
     * @param userId
     * @return {Promise<{void}>}
     */
    async deleteUser(userId) {
        const result = await this.delete(userId);
        return {data: result};
    }

    async fetchUsers() {
        const user = await this.get();
        return {data: user};
    }

    async getUser(userId) {
        const user = this.find(userId);
        return {data: user};
    }

    async getUserByEmail(email) {
        const params = [email];
        const sql = `SELECT first_name as firstName, last_name as lastName, email, password FROM ${usersTableName} WHERE email = ?`;
        const result = await this.query(sql, params);
        return result[0];
    }

    async updateUser(user, userId) {
        await this.update(user, userId);
        return {data: user};
    }

}

module.exports = new UserRepository();